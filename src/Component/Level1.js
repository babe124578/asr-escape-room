import React, { Component } from "react";
import "../CSS/Level1.css"
class Level1 extends Component {

  componentDidMount() {
    var c = document.getElementById("myCanvas")
    // eslint-disable-next-line no-unused-vars
    var ctx = c.getContext("2d")
  }
  render() {
    return (
      <div>
        <div class="canvas-container">
          <canvas id="myCanvas"></canvas>
        </div>



        <script src="game.js"></script>
        <script src="microphone.js"></script>
        <script src="controller.js"></script>
      </div>
    );
  }
}

export default Level1;


