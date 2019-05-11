import React, { Component } from 'react';
import {FormControl,InputGroup,Button,Row,Col} from 'react-bootstrap'
import $ from 'jquery'
import Dictate from  '../lib/dictate.js'

export default class Microphone extends Component {
    constructor(props){
        super(props)
        this.state = {
            recording:false,
            serverStatus:"NOT_READY",
            gowajeeStatus:"NOT_READY",
            window:{},
            transcription:null,
            dictate:null,
            onlineMode:false,
            actionDetectorOnline:true,
            gowajeeDetectorOnline:true,
            ignoreGowajee: false,
            actionDetectorTimeout: null
        }
    }
    
    componentDidMount () {
        
        Dictate(this.state.window);
        
        var transcription = new this.state.window.Transcription();
        this.state.transcription = transcription;
        
        var worker = this.props.worker;
        
        var dictate = new this.state.window.Dictate({
            server : "ws://127.0.0.1:8080/client/ws/speech",
            serverStatus : "ws://127.0.0.1:8080/client/ws/status",
            window: this.state.window,
            recorderWorkerPath : worker,
            onReadyForSpeech : function() {
                console.log("READY FOR SPEECH");
                this.setState({serverStatus:"RECORDING"});
                this.setState({recording:true});
            }.bind(this),
            onEndOfSpeech : function() {
                console.log("END FOR SPEECH");
            }.bind(this),
            onEndOfSession : function() {
                console.log("END OF SESSION");
                this.setState({serverStatus:"SESSION_END"});
                this.setState({recording:false});
            }.bind(this),
            onServerStatus : function(json) {
                //console.log(json.num_workers_available + ':' + json.num_requests_processed)
                if (json.num_workers_available == 0) {
                    if(!this.state.recording)
                        this.setState({serverStatus:"NO_WORKER"});
                } else {
                    this.setState({serverStatus:"AVAILABLE"});
                    
                    if(this.state.onlineMode && this.state.actionDetectorOnline) this.startRecord(); // If online mode then immediately start record
                }
            }.bind(this),
            onPartialResults : function(hypos) {
                // TODO: demo the case where there are more hypos
                transcription.add(hypos[0].transcript, false);
                let transcript = hypos[0].transcript.toString();
                console.log("Partial result ",transcript);
                if(transcript.indexOf("โกวาจี") != -1) {
                    this.setState({transcript: transcript.substr(transcript.indexOf("โกวาจี"))});
                }
                else {
                    this.setState({transcript: ""});
                    dictate.sendEOS();
                }
                
                //__updateTranscript(tt.toString());
            }.bind(this),
            onResults : function(hypos) {
                // TODO: demo the case where there are more results
                transcription.add(hypos[0].transcript, true)
                /*for(let hypo of hypos) {
                    console.log("Hypo data ",hypo.transcript.toString(),hypo.likelihood)
                }*/
                console.log("Result: best transcript "+transcription.toString())
                let transcript = transcription.toString();
                if(transcript.indexOf("โกวาจี") != -1 || this.state.ignoreGowajee) {
                    // valid command
                    let cmd = transcript;
                    if(!this.state.ignoreGowajee)
                        cmd = transcript.substr(transcript.indexOf("โกวาจี")+7);
                    cmd = cmd.replace(' .','');
                    this.setState({transcript: cmd});
                    console.log("CMD",cmd);
                    if(this.state.onlineMode) {
                        clearTimeout(this.state.actionDetectorTimeout);
                        this.state.actionDetectorOnline = false;
                        this.cancelRecord();
                        
                        this.state.gowajeeDetectorOnline = true;
                        this.state.gowajeeDetector.startListening();
                    }
                    this.props.handleCommand(cmd);
                }
                else {
                    this.setState({transcript: ""});
                }
                transcription.clear();
                //this.setState({transcript: transcription.toString()})
                
                //__updateTranscript();
                // diff() is defined only in diff.html
                /*if (typeof(diff) == "function") {
                    diff();
                }*/
            }.bind(this),
            onError : function(code, data) {
                console.log(code,data);
                dictate.cancel();
            }.bind(this),
            onEvent : function(code, data) {
                //console.log("ACT",code,data);
            }.bind(this)
        });
        this.state.dictate = dictate;
        this.state.dictate.init();
        
        
        
        
        
        
        
        
        var gowajeeDetector = new this.state.window.Dictate({
            server : "ws://localhost:8081/client/ws/speech",
            serverStatus : "ws://localhost:8081/client/ws/status",
            window: this.state.window,
            recorderWorkerPath : worker,
            onReadyForSpeech : function() {
                //console.log("READY FOR SPEECH");
                this.setState({gowajeeStatus:"RECORDING"});
            }.bind(this),
            onEndOfSpeech : function() {
                //console.log("END FOR SPEECH");
                this.setState({gowajeeStatus:"END_OF_SPEECH"});
            }.bind(this),
            onEndOfSession : function() {
                //console.log("END OF SESSION");
            }.bind(this),
            onServerStatus : function(json) {
                if (json.num_workers_available == 0) {
                    if(this.state.gowajeeStatus !== "RECORDING")
                        this.setState({gowajeeStatus:"NO_WORKER_AVAILABLE"});
                } else {
                    this.setState({gowajeeStatus:"AVAILABLE"});
                    
                    if(this.state.onlineMode && this.state.gowajeeDetectorOnline) this.state.gowajeeDetector.startListening(); // If online mode then immediately start record
                }
            }.bind(this),
            onPartialResults : function(hypos) {
                console.log("GowajeeDetector "+hypos[0].transcript.toString());
                if(hypos[0].transcript.toString().indexOf("โกวาจี") != -1 && this.state.onlineMode && !this.state.actionDetectorOnline) {
                    console.log("GowajeeDetector found โกวาจี");
                    this.state.gowajeeDetectorOnline = false;
                    this.state.gowajeeDetector.stopListening();
                    
                    this.state.actionDetectorTimeout = setTimeout(()=>{
                        console.log("Action time limit exceeded");
                        this.state.actionDetectorOnline = false;
                        this.stopRecord();
                        
                        this.state.gowajeeDetectorOnline = true;
                        this.state.gowajeeDetector.startListening();
                    },5000); // action detector time limit
                    
                    this.state.actionDetectorOnline = true;
                    this.startRecord();
                    //this.state.dictate.startListening();
                }
                // TODO: demo the case where there are more hypos
                /*transcription.add(hypos[0].transcript, false);
                let transcript = hypos[0].transcript.toString();
                console.log("Partial result ",transcript);
                if(transcript.indexOf("โกวาจี") != -1) {
                    this.setState({transcript: transcript.substr(transcript.indexOf("โกวาจี"))});
                }
                else {
                    this.setState({transcript: ""});
                    dictate.sendEOS();
                }*/
                
                //__updateTranscript(tt.toString());
            }.bind(this),
            onResults : function(hypos) {
                // TODO: demo the case where there are more results
                /*transcription.add(hypos[0].transcript, true)
                console.log("Result: best transcript "+transcription.toString())
                let transcript = transcription.toString();
                if(transcript.indexOf("โกวาจี") != -1) {
                    // valid command
                    let cmd = transcript.substr(transcript.indexOf("โกวาจี")+7);
                    cmd = cmd.replace(' .','');
                    this.setState({transcript: cmd});
                    console.log("CMD",cmd);
                    this.props.handleCommand(cmd);
                    this.stopRecord();
                }
                else {
                    this.setState({transcript: ""});
                }
                transcription.clear();*/
                //this.setState({transcript: transcription.toString()})
                
                //__updateTranscript();
                // diff() is defined only in diff.html
                /*if (typeof(diff) == "function") {
                    diff();
                }*/
            }.bind(this),
            onError : function(code, data) {
                console.log(code,data);
                gowajeeDetector.cancel();
            }.bind(this),
            onEvent : function(code, data) {
                //console.log("GOW",code,data);
            }.bind(this)
        });
        this.state.gowajeeDetector = gowajeeDetector;
        this.state.gowajeeDetector.init();
    }
    
    startRecord() {
        console.log("Start record");
        //this.props.handleCommand(prompt("CMD"));
        this.state.transcription.clear();
        this.state.dictate.startListening();
        
        //this.setState({recording:true});
    }
    
    stopRecord() {
        this.state.dictate.stopListening();
        //this.setState({recording:false});
    }
    
    cancelRecord() {
        this.state.dictate.cancel();
    }
    
    onlineBtnPressed() {
        let newMode = !this.state.onlineMode;
        this.setState({onlineMode:newMode});
        if(newMode == true) {
            // online
            this.state.gowajeeDetectorOnline = true;
            this.state.gowajeeDetector.startListening();
            this.state.actionDetectorOnline = false;
            this.stopRecord();
            this.state.ignoreGowajee = true;
        }
        else {
            this.state.gowajeeDetector.stopListening();
            this.stopRecord();
            this.state.ignoreGowajee = false;
        }
        /*if(newMode && this.state.serverStatus == "AVAILABLE") {
            // reconnect
            this.startRecord();
        }*/
    }
    
    render(){
        return(
            <div className="h-100 d-flex align-items-center">
                <div className="input-group my-3 flex-grow-1 mx-2">
                    <FormControl
                        type="text"
                        value={this.state.transcript}
                        placeholder="Enter text"
                    />
                    <div className="input-group-append">
                        <Button id="recordBtn" onClick={this.state.recording?this.stopRecord.bind(this):this.startRecord.bind(this)} >
                            {this.state.recording?'Stop':'Start'}
                        </Button>
                    </div>
                </div>
                <Button id="onlineBtn" className="mx-2" onClick={this.onlineBtnPressed.bind(this)} >
                    {this.state.onlineMode?'End online':'Begin online'}
                </Button>
                <div className="mx-2" >STATUS: {this.state.serverStatus}</div>
                <div className="mx-2" >GOWAJEE: {this.state.gowajeeStatus}</div>
            </div>
        )
    }
}