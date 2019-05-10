import React, { Component } from "react";
import "../CSS/SpeechBar.css";
import microphone from "../images/MicrophoneICON.svg";
import Dictate from  '../lib/dictate.js'
import {FormControl} from 'react-bootstrap'

class SpeechBar extends Component {
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
				server : "ws://localhost:8080/client/ws/speech",
				serverStatus : "ws://localhost:8080/client/ws/status",
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
  render() {
    return (
      <div className="speechbar">
        <button ref="mic" src={microphone} alt="microphone" width={100} height={100} onClick={this.state.recording?this.stopRecord.bind(this):this.startRecord.bind(this)}>
				{this.state.recording?'Stop':'Start'}
				</button>
        <h1 className="asrText">{}</h1>
        <p className='texttest'>{this.props.text}</p>
      </div>
    );
  }
}

export default SpeechBar;