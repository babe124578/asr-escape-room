import React, { Component } from "react";

import Startpage from "./Component/Startpage";
import SpeechBar from "./Component/SpeechBar";
import Level1 from "./Component/Level1";
import ItemBarLevel1 from "./Component/ItemBarLevel1";
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
      <div style={{margin:'30px'}}>
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
