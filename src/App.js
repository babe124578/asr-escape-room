import React, { Component } from "react";

import Startpage from "./Component/Startpage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false
    };
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
          <Startpage></Startpage>) :
          (null)
        }
      </div>
    );
  }
}

export default App;
