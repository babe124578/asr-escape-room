import React, { Component } from "react";
import "../CSS/Level1.css"
class Level1 extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    var c = document.getElementById("myCanvas")
    // eslint-disable-next-line no-unused-vars
    var ctx = c.getContext("2d")
    c.addEventListener("mousemove", changeCursor, false);
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

      var rect = c.getBoundingClientRect();
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
        c.style.cursor = "pointer";
      } else {
        c.style.cursor = "default";
      }
    }
    /**defined all resource*/
    console.log("passthisline")
    
    var door = "../images/door.jpg"
    var knife = "../images/knife.jpg"
    var leftdesk = "../images/leftdesk.jpg"
    var noknife = "../images/noknife.jpg"
    var room = "../images/room.jpg"
    var roomnoknife = "../images/roomnoknife.jpg"

    function draw(v, c, w, h) {
      c.drawImage(v, 0, 0, w, h);
      if (!v.ended) {
        setTimeout(draw, 20, v, c, w, h);
      }
    }
    var currentWall = 0;
    /**
     * == 0 -> Startpage
     * == 1 -> room
     * == 2 -> knife
     * == 3 -> no knife
     * == 4 -> leftdesk
     * == 5 -> door
     * == 6 -> 
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
    img1.onload = function () {
      ctx.drawImage(img1, 0, 0, img1.width, img1.height, 0, 0, c.width, c.height);
      ctx.drawImage(img2, 0, 0, img2.width, img2.height, 0, 0, c.width, c.height);
    };
    img1.src = room;



    c.addEventListener("mousedown", clicked, false);

    function clicked(e) {
      e.preventDefault();

      var rect = c.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      switch (currentWall) {
        case 0:
          if (x >= 730 && x < 770 && y >= 290 && y <= 310) {
            img1.src = knife;
            currentWall = 2;
          }
          break;
        case 2:
          if (x >= 372 && x < 613 && y >= 327 && y <= 377) {
            img1.src = noknife;
            currentWall = 3;
          }
          break;
        case 3:
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
      <div>
        <div className="canvas-container">
          <canvas id="myCanvas"></canvas>
        </div>
        <img src={require('../images/door.jpg')} alt="aaa" />
      </div>
    );
  }
}

export default Level1;


