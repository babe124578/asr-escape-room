import React, { Component } from "react";
import "../CSS/Level1.css";

import door from "../images/Level1/door.jpg";
import knife from "../images/Level1/knife.jpg";
import leftdesk from "../images/Level1/leftdesk.jpg";
import noknife from "../images/Level1/noknife.jpg";
import roomBoxSafeKnife from "../images/Level1/room_withboth.jpg";
import roomBoxSafeNoknife from "../images/Level1/room_both_noknife.jpg";
import RoomOpenboxSafeNoknife from "../images/Level1/room_with_box_open.png";
import popupCloseboxWithKnifeInroom from "../images/Level1/popup-closebox-knife.jpg";
import popupCloseboxWithoutKnifeInroom from "../images/Level1/popup-closebox-noknife.jpg";

class Level1 extends Component {
  componentDidMount() {
    //for draw canvas
    var canvas = this.refs.canvas;
    var ctx = canvas.getContext("2d");
    canvas.addEventListener("mousemove", changeCursor, false);

    function changeCursor(e) {
      e.preventDefault();
      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      console.log("move: (" + x + ", " + y + ")");
    }

    var currentWall = 1; //บอกว่าตอนนี้อยู่ฉากไหน
    /**
     * == 1 -> roomBoxSafeKnife
     * == 2 -> knife
     * == 3 -> noknife
     * == 4 -> roomBoxSafeNoknife
     * == 5 -> RoomOpenBoxSafeNoknife
     * == 6 -> popupCloseboxWithKnifeInroom
     * == 7 -> popupCloseboxWithoutKnifeInroom
     */

    var img1 = new Image();
    img1.src = roomBoxSafeKnife;
    img1.onload = () => {
      //โหลดรูปลง Canvas
      ctx.drawImage(
        img1,
        0,
        0,
        img1.width,
        img1.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    };
    canvas.addEventListener("mousedown", clicked, false); //เพื่ออรับพิกัด Mouse ตลอดเวลา

    var hasKnife = false; //ไม่มีมีดเปิดกล่องไม่ได้
    var isSafeUnlock = false; //case true = มีกุญแจ
    var isBoxOpen = false;

    function clicked(e) {
      e.preventDefault();

      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      switch (currentWall) {
        case 1: //room with everything
          if (x >= 700 && x < 900 && y >= 160 && y <= 400) {
            img1.src = knife;
            currentWall = 2;
          } else if (x >= 280 && x < 380 && y >= 380 && y <= 490) {
            img1.src = popupCloseboxWithKnifeInroom;
            currentWall = 6;
          }
          break;
        case 2: //ตู้ขวา with knife
          if (x >= 372 && x < 613 && y >= 327 && y <= 377) {
            img1.src = noknife;
            hasKnife = true;
            currentWall = 3;
          } else if (x >= 0 && x < 64 && y >= 0 && y <= 64) {
            img1.src = roomBoxSafeKnife;
            currentWall = 1;
          }
          break;
        case 3: //ตู้ขวา without knife
          if (x >= 0 && x < 64 && y >= 0 && y <= 64) {
            if (isBoxOpen === false) {
              img1.src = roomBoxSafeNoknife;
              currentWall = 4;
            } else if (isBoxOpen === true) {
              img1.src = RoomOpenboxSafeNoknife;
              currentWall = 5;
            }
          }
          break;
        case 4: //room with everything except knife
          if (x >= 700 && x < 900 && y >= 160 && y <= 400) {
            img1.src = noknife;
            currentWall = 3;
          } else if (x >= 280 && x < 380 && y >= 380 && y <= 490) {
            img1.src = popupCloseboxWithoutKnifeInroom;
            currentWall = 7;
          }
          break;
        case 5: //ห้องที่กล่องเปิดแล้ว
          if (x >= 700 && x < 900 && y >= 160 && y <= 400) {
            img1.src = noknife;
            currentWall = 3;
          }
          break;
        case 6: //popupcloseknife
          if (x >= 0 && x < 64 && y >= 0 && y <= 56) {
            img1.src = roomBoxSafeKnife;
            currentWall = 1;
          }
          break;
        case 7: //popupclosenoknife
          if (x >= 0 && x < 64 && y >= 0 && y <= 56) {
            img1.src = roomBoxSafeNoknife;
            currentWall = 4;
          } else if (x >= 380 && x < 580 && y >= 160 && y <= 380) {
            isBoxOpen = true;
            console.log("box opened");
            currentWall = 8;
          }
          break;
        case 8: //popupopenbox
          if (x >= 0 && x < 64 && y >= 0 && y <= 56) {
            img1.src = RoomOpenboxSafeNoknife;
            currentWall = 5;
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
        <canvas className="canva" ref="canvas" width={960} height={540} />
      </div>
    );
  }
}

export default Level1;
