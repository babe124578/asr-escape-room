import React, { Component } from "react";

import Startpage from "./Component/Startpage";
import Level1 from "./Component/Level1";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.text = "eiei";
    this.state = {
      isStart: false
    };
    this.changeStart = this.changeStart.bind(this);
  }
  changeStart(status) {
    this.setState({
      isStart: status
    });
  }

  render() {
    return (
      <div >
        {this.state.isStart === false ? (
          <Startpage changeStart={this.changeStart} />
        ) :
            <Level1 />
        }
      </div>
    );
  }
}

export default App;
