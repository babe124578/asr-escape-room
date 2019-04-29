import React, { Component } from "react";

import Startpage from "./Component/Startpage";
import SpeechBar from "./Component/SpeechBar";
import Level1 from "./Component/Level1";
import ItemBarLevel1 from "./Component/ItemBarLevel1";
class App extends Component {
  constructor(props) {
    super(props);
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
      <div>
        {this.state.isStart === false ? (
          <Startpage changeStart={this.changeStart} />
        ) : (
          <div>
            <SpeechBar />
            <Level1 />
            <ItemBarLevel1 />
          </div>
        )}
      </div>
    );
  }
}

export default App;
