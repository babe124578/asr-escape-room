import React, { Component } from "react";
import "../CSS/SpeechBar.css";
import microphone from "../images/MicrophoneICON.svg";

class SpeechBar extends Component {
    
    render() {
      return (
        <div className="speechbar">
          <img ref="mic" src={microphone} alt="microphone" width={100} height={100}></img>
        </div>
      );
    }
  }
  
  export default SpeechBar;
  

