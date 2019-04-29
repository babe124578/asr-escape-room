import React, { Component } from "react";
import "../CSS/StartPage.css";
class StartPage extends Component {
    
    render() {
      return (
        <div className="startPage">
            <button
            onClick={e => {
                this.props.changeStart(true);
            }}
            >click to start</button>
        
        </div>
      );
    }
  }
  
  export default StartPage;
  

