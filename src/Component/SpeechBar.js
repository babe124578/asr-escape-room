import React, { Component } from "react";
import "../CSS/SpeechBar.css"
class SpeechBar extends Component {
    
    render() {
      return (
        <div className="speechbar"><p>{this.props.text}</p>
        </div>
      );
    }
  }
  
  export default SpeechBar;
  

