/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import "../CSS/Level1.css"

import door from "../images/Level1/door.jpg";
import room from "../images/Level1/room.jpg";
import knife from "../images/Level1/knife.jpg";
import leftdesk from "../images/Level1/leftdesk.jpg";
import noknife from "../images/Level1/noknife.jpg";
import roomnoknife from "../images/Level1/roomnoknife.jpg";
import closebox from "../images/Level1/box.tiff";
import openbox from "../images/Level1/box_open.png";
import roomBoxSafeKnife from "../images/Level1/room_withboth.jpg";
import roomBoxSafeNoknife from "../images/Level1/room_both_noknife.jpg";
import RoomOpenboxSafeNoknife from "../images/Level1/room_with_box_open.png";
import backarrow from "../images/Level1/back-arrow.png";

console.log(room)
class Level1 extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    var canvas = this.refs.canvas;
    // eslint-disable-next-line no-unused-vars
    var ctx = canvas.getContext("2d")
    canvas.addEventListener("mousemove", changeCursor, false);
    /**
         * A clickable object
         * inBounds returns true if co-ordinates are within the bounds of the object
         *
         * optional `canMouseOver` allowing a function to state whether an object can be
         * moused over or not.
         *
         * The `canMouseOver` function should return a boolean.
         */
    class GameObject {
      constructor(x1, x2, y1, y2, wall, click, canMouseOver) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.wall = wall;
        this.click = click || function () { };
        this.inBounds = function (x, y) {
          return this.x1 <= x && this.x2 >= x && this.y1 <= y && this.y2 >= y;
        };
        this.canMouseOver =
          canMouseOver ||
          function () {
            return true;
          };
      }
    }

    function clicked(e) {
      e.preventDefault();

      var x = e.clientX;
      var y = e.clientY;

      console.log("click: (" + x + ", " + y + ")");

      for (var key in objects) {
        if (objects[key].wall == currentWall) {
          if (objects[key].inBounds(x, y)) {
            console.log(key);
            objects[key].click();
          }
        }
      }
    }

    function changeCursor(e) {
      e.preventDefault();

      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      console.log("move: (" + x + ", " + y + ")");

      function mouseoverobject() {
        for (var key in objects) {
          if (objects[key].wall == currentWall) {
            if (objects[key].canMouseOver()) {
              if (objects[key].inBounds(x, y)) {
                return true;
              }
            }
          }
        }
        return false;
      }
      if (mouseoverobject()) {
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "default";
      }
    }
    /**defined all resource*/

    function draw(v, c, w, h) {
      c.drawImage(v, 0, 0, w, h);
      if (!v.ended) {
        setTimeout(draw, 20, v, c, w, h);
      }
    }
    var currentWall = 1;
    /**
     * == 1 -> roomBoxSafeKnife
     * == 2 -> knife
     * == 3 -> noknife
     * == 4 -> roomBoxSafeNoknife
     * == 5 -> door
     * == 6 -> RoomOpenBoxSafeNoknife
     * == 7 -> 
     */
    var hold = 0;
    /**
     * == 0 -> nothing
     * == 1 -> key
     * == 2 -> knife
     * == 3 -> 
     * == 4 -> 
     * == 5 -> 
     */
    var objects = {
      knife1: new GameObject(780, 815, 300, 325, 1)
    }
    var img1 = new Image();
    var img2 = new Image();
    img1.src = roomBoxSafeKnife;
    img1.onload = () => {
      ctx.drawImage(img1, 0, 0, img1.width, img1.height, 0, 0, canvas.width, canvas.height);
    };
    img2.onload = () => {
      ctx.drawImage(img2, 0, 476);
    };
    canvas.addEventListener("mousedown", clicked, false);

    function clicked(e) {
      e.preventDefault();

      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      switch (currentWall) {
        case 1:
          if (x >= 730 && x < 770 && y >= 290 && y <= 310) {
            img1.src = knife;
            currentWall = 2;
            img2.src = backarrow;
          }
          break;
        case 2:
          if (x >= 372 && x < 613 && y >= 327 && y <= 377) {
            img1.src = noknife;
            img2.src = backarrow;
            currentWall = 3;
          }
          break;
        case 3:
          if (x >= 0 && x < 64 && y >= 476 && y <= 540) {
            img1.src = roomBoxSafeNoknife;
            currentWall = 4;
          }
          break;
        case 4:
          if (x >= 372 && x < 613 && y >= 327 && y <= 377) {
            img1.src = knife;
            currentWall = 2;
          }
          break;
        case 5:
          if (x >= 372 && x < 613 && y >= 327 && y <= 377) {
            img1.src = knife;
            currentWall = 2;
          }
          break;
        case 6:
          if (x >= 372 && x < 613 && y >= 327 && y <= 377) {
            img1.src = knife;
            currentWall = 2;
          }
          break;
        default:
          break;
      }
    }
  }
  render() {
    return (
      <div className="canvas-container">
        <canvas className="canva" ref="canvas" width={960} height={540}></canvas>
      </div>
    );
  }
}

export default Level1;


