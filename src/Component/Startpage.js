import React, { Component } from "react";

class StartPage extends Component {
    
    render() {
      return (
        <div className="speechbar">
            <button
            onClick={e => {
                this.props.changeStart(true);
            }}
            >click</button>
        
        </div>
      );
    }
  }
  
  export default StartPage;
  

