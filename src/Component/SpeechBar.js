import React, { Component } from "react";
import "../CSS/SpeechBar.css";
import microphone from "../images/MicrophoneICON.svg";
import Dictate from  '../lib/dictate.js'

export default class SpeechBar extends Component {
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
            ignoreGowajee: true,
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
                  // valid command
                  let cmd = transcript;
                  cmd = cmd.replace(' .','');
                  this.setState({transcript: cmd});
                  console.log("CMD",cmd);
                  this.props.handleCommand(cmd);
              
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

      
    }
    
    startRecord() {
        console.log("Start record");
        //this.props.handleCommand(prompt("CMD"));
        this.state.transcription.clear();
        this.state.dictate.startListening();
        
        this.setState({recording:true});
    }
    
    stopRecord() {
        this.state.dictate.stopListening();
        //this.state.recording = false;
        this.setState({recording:false});
    }
    
    cancelRecord() {
        this.state.dictate.cancel();
    }
    
    onlineBtnPressed() {
            let newMode = !this.state.onlineMode;
            this.setState({onlineMode:newMode});
            this.state.gowajeeDetectorOnline = true;
            this.state.gowajeeDetector.startListening();
            this.state.actionDetectorOnline = false;
            this.stopRecord();
            this.state.ignoreGowajee = true;
    }
    
    render(){
        return(
          <div className="speechbar">
          <button width={100} height={100} onClick={this.state.recording?this.stopRecord.bind(this):this.startRecord.bind(this)} >
            {this.state.recording?'Stop':'Start'}
          </button>
          <p className='texttest'>{this.props.text}</p>
          </div>
        )
    }
}


