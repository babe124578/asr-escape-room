import React, { Component } from "react";
import "../CSS/Level1.css";

import door from "../images/Level1/door.jpg";
import knife from "../images/Level1/knife.jpg";
import leftdesk from "../images/Level1/leftdesk.jpg";
import noknife from "../images/Level1/noknife.jpg";
import roomBoxSafeKnife from "../images/Level1/room_withboth.jpg";
import roomBoxSafeNoknife from "../images/Level1/room_both_noknife.jpg";
import roomOpenboxSafeNoknife from "../images/Level1/room_with_box_open.png";
import popupCloseboxWithKnifeInroom from "../images/Level1/popup-closebox-knife.jpg";
import popupCloseboxWithoutKnifeInroom from "../images/Level1/popup-closebox-noknife.jpg";
import popupBoxOpenWithPassword from "../images/Level1/popup-openbox.jpg";
import knifeImage from "../images/Level1/knife.png";
import keyImage from "../images/Level1/key.png";
import itemBar from "../images/Level1/itemBar.png"

import SpeechBar from "./SpeechBar";

class Level1 extends Component {
  constructor() {
    super()
    this.state = {
      text: "test text"
    }
  }
  componentDidMount() {
    //for draw canvas
    var canvas = this.refs.canvas; //Here we are simply finding the <canvas> element and saving it to a variable.
    var canvasItem = this.refs.canvasItem;
    var ctxItem = canvasItem.getContext("2d");
    //var eieiz = this.refs.eiei;
    var ctx = canvas.getContext("2d");
    canvas.addEventListener("mousemove", changeCursor, false);
    this.setState({
      text: "eiei"
    })
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
     * == 5 -> roomOpenBoxSafeNoknife
     * == 6 -> popupCloseboxWithKnifeInroom
     * == 7 -> popupCloseboxWithoutKnifeInroom
     * == 8 -> popupOpenbox -- ยังไม่ได้สร้าง image
     * == 9 -> zoomAtSafeWithNumpad
     * == 10 -> door
     */

    var img1 = new Image();
    var img2 = new Image();
    var item1 = new Image();
    var item2 = new Image();
    var item3 = new Image();
    var item4 = new Image();
    img1.src = roomBoxSafeKnife;
    img2.src = itemBar;
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
    }
    img2.onload = () => {
      ctxItem.drawImage(
        img2, 0, 0, img2.width, img2.height, 0, 0, canvasItem.width, canvasItem.height
      );
    }
    item1.onload = () => {
      ctxItem.drawImage(
        item1, 0, 0, item1.width, item1.height, 10, 10, 115, 115
      );
    }
    item2.onload = () => {
      ctxItem.drawImage(
        item2, 0, 0, item2.width, item2.height, 10, 145, 115, 115
      );
    }
    item3.onload = () => {
      ctxItem.drawImage(
        item3, 0, 0, item3.width, item3.height, 10, 280, 115, 115
      );
    }
    item4.onload = () => {
      ctxItem.drawImage(
        item4, 0, 0, item4.width, item4.height, 10, 415, 115, 115
      );
    };
    canvas.addEventListener("mousedown", changeImage, false); //เพื่ออรับพิกัด Mouse ตลอดเวลา

    var hasKnife = false; //ไม่มีมีดเปิดกล่องไม่ได้
    var hasKey = false; //case true = มีกุญแจ
    var isBoxOpen = false;

    function changeImage(e) {
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
            //eieiz.src = leftdesk;
            currentWall = 6;
          } else if (x >= 84 && x < 250 && y >= 244 && y <= 460) {
            img1.src = leftdesk; //temporary(for test only)
            currentWall = 9;
          } else if (x >= 406 && x < 554 && y >= 146 && y <= 367) { //กดประตู
            img1.src = door;
            currentWall = 10;
          }
          break;
        case 2: //ตู้ขวา with knife
          if (x >= 372 && x < 613 && y >= 327 && y <= 377) {
            img1.src = noknife;
            hasKnife = true;
            currentWall = 3;
            item1.src = knifeImage;
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
              img1.src = roomOpenboxSafeNoknife;
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
          } else if (x >= 406 && x < 554 && y >= 146 && y <= 367) { //กดประตู
            img1.src = door;
            currentWall = 10;
          }
          break;
        case 5: //ห้องที่กล่องเปิดแล้ว
          if (x >= 700 && x < 900 && y >= 160 && y <= 400) {
            img1.src = noknife;
            currentWall = 3;
          } else if (x >= 406 && x < 554 && y >= 146 && y <= 367) { //กดประตู
            img1.src = door;
            currentWall = 10;
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
          } else if (x >= 380 && x < 580 && y >= 160 && y <= 380 && hasKnife === true) {
            isBoxOpen = true;
            img1.src = popupBoxOpenWithPassword;
            currentWall = 8;
          }
          break;
        case 8: //popupopenbox
          if (x >= 0 && x < 64 && y >= 0 && y <= 56) {
            img1.src = roomOpenboxSafeNoknife;
            currentWall = 5;
          }
          break;
        case 9: // leftdesk
          if (x >= 0 && x < 64 && y >= 0 && y <= 56) {
            hasKey = true;
            img1.src = roomOpenboxSafeNoknife;
            currentWall = 5;
            item2.src = keyImage;
          }
          break;
        case 10: // door
          if (x >= 0 && x < 64 && y >= 0 && y <= 56) {
            if (isBoxOpen === true) {
              img1.src = roomOpenboxSafeNoknife;
              currentWall = 5;
            } else if (hasKnife === true && isBoxOpen === false) {
              img1.src = roomBoxSafeNoknife;
              currentWall = 4;
            } else if (hasKnife === false) {
              img1.src = roomBoxSafeKnife;
              currentWall = 1;
            }
          } else if (x >= 309 && x < 651 && y >= 0 && y <= 491) { //กดประตูเพื่อเปิด
            if (hasKey) {
              console.log("จบ")
              return <p>จบแล้วจ้า</p>
            }
          }
          break;
        default:
          break;
      }
    }
  }

  render() {
    return (
      <div className='container'>
        <SpeechBar text={this.state.text} />
        <div className="canvas-container">
          <canvas className="canva" ref="canvas" width={960} height={540} />
          <canvas classname="canva" ref="canvasItem" width={135} height={540} style={{ float: "left" }} />
        </div>
      </div>
    );
  }
}

export default Level1;
