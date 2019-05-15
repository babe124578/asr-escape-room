var door = "images/door.jpg";
var knife = "images/knife.jpg";
var noknife = "images/noknife.jpg";
var roomBoxSafeKnife = "images/room_withboth.jpg";
var roomBoxSafeNoknife = "images/room_both_noknife.jpg";
var roomOpenboxSafeNoknife = "images/room_with_box_open.png";
var popupCloseboxWithKnifeInroom = "images/popup-closebox-knife.jpg";
var popupCloseboxWithoutKnifeInroom = "images/popup-closebox-noknife.jpg";
var popupBoxOpenWithPassword = "images/popup-openbox.jpg";
var knifeImage = "images/knife.png";
var keyImage = "images/key.png";
var itemBar = "images/itemBar.png"
var safeclose = "images/safeclose.png";
var safeopen = "images/safeopen.jpg";


var hasKnife = false; //ไม่มีมีดเปิดกล่องไม่ได้
var hasKey = false; //case true = มีกุญแจ
var isBoxOpen = false;
var playerPass = '';

var currentWall = 1; //บอกว่าตอนนี้อยู่ฉากไหน
    /**
     * == 1 -> roomBoxSafeKnife
     * == 2 -> knife
     * == 3 -> noknife
     * == 4 -> roomBoxSafeNoknife
     * == 5 -> roomOpenBoxSafeNoknife
     * == 6 -> popupCloseboxWithKnifeInroom
     * == 7 -> popupCloseboxWithoutKnifeInroom
     * == 8 -> popupOpenbox
     * == 9 -> zoomAtSafeWithNumpad //อาจจะตัดออก(ขี้เกียจแก้สวิตช์)
     * == 10 -> door
     * == 11 -> safeclose
     * == 12 -> safeopen
     */

// From componentDidMount --------------------------------------------------------------------
    String.prototype.replaceAll = function (search, replacement) {
      var target = this;
      return target.split(search).join(replacement);
    };
    //for draw canvas
    var canvas = document.getElementById("canvas"); //Here we are simply finding the <canvas> element and saving it to a variable.
    var canvasItem = document.getElementById("canvasItem");
    var ctxItem = canvasItem.getContext("2d");
    //var eieiz = this.refs.eiei;
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial"
    ctx.fillStyle = "green";
	
    var asrtext = ""

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
    canvas.addEventListener("mousedown", changeImage, false); //เพื่อรับ change image ตาม mouse click

    /* Change Image is HEREEEEEEEEEEEEEE */
    function changeImage(e) {
      console.log('haskey = ' + hasKey);
      console.log('hasknife = ' + hasKnife);
      console.log('isboxopen = ' + isBoxOpen);
      e.preventDefault();

      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      switch (currentWall) {
        case 1: //room with everything
          if ((x >= 700 && x < 900 && y >= 160 && y <= 400) || asrtext === "ดูตู้ข้างขวา") {
            img1.src = knife;
            currentWall = 2;
          } else if ((x >= 280 && x < 380 && y >= 380 && y <= 490) || asrtext === "ดูกล่อง") {
            img1.src = popupCloseboxWithKnifeInroom;
            //eieiz.src = leftdesk;
            currentWall = 6;
          } else if ((x >= 84 && x < 250 && y >= 244 && y <= 460) || asrtext === "ดูตู้ข้างซ้าย") {
            if (hasKey === false) {
              img1.src = safeclose;
              currentWall = 11;
            } else {
              img1.src = safeopen;
              currentWall = 12;
            }
          } else if ((x >= 406 && x < 554 && y >= 146 && y <= 367) || asrtext === "ดูประตู") { //กดประตู
            img1.src = door;
            currentWall = 10;
          }
          break;
        case 2: //ตู้ขวา with knife
          if ((x >= 372 && x < 613 && y >= 327 && y <= 377) || asrtext === "หยิบมีด") {
            img1.src = noknife;
            hasKnife = true;
            currentWall = 3;
            item1.src = knifeImage;
          } else if ((x >= 0 && x < 64 && y >= 0 && y <= 64) || asrtext === "ย้อนกลับ") {
            img1.src = roomBoxSafeKnife;
            currentWall = 1;
          }
          break;
        case 3: //ตู้ขวา without knife
          if ((x >= 0 && x < 64 && y >= 0 && y <= 64) || asrtext === "ย้อนกลับ") {
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
          if ((x >= 700 && x < 900 && y >= 160 && y <= 400) || asrtext === "ดูตู้ข้างขวา") {
            img1.src = noknife;
            currentWall = 3;
          } else if ((x >= 280 && x < 380 && y >= 380 && y <= 490) || asrtext === "ดูกล่อง") {
            img1.src = popupCloseboxWithoutKnifeInroom;
            currentWall = 7;
          } else if ((x >= 406 && x < 554 && y >= 146 && y <= 367) || asrtext === "ดูประตู") { //กดประตู
            img1.src = door;
            currentWall = 10;
          } else if ((x >= 84 && x < 250 && y >= 244 && y <= 460) || "ดูตู้ข้างซ้าย") {
            if (hasKey === false) {
              img1.src = safeclose;
              currentWall = 11;
            } else {
              img1.src = safeopen;
              currentWall = 12;
            }
          }
          break;
        case 5: //ห้องที่กล่องเปิดแล้ว
          if ((x >= 700 && x < 900 && y >= 160 && y <= 400) || asrtext === "ดูตู้ข้างขวา") {
            img1.src = noknife;
            currentWall = 3;
          } else if ((x >= 406 && x < 554 && y >= 146 && y <= 367) || asrtext === "ดูประตู") { //กดประตู
            img1.src = door;
            currentWall = 10;
          } else if ((x >= 84 && x < 250 && y >= 244 && y <= 460) || asrtext === "ดูตู้ข้างซ้าย") {
            if (hasKey === false) {
              img1.src = safeclose;
              currentWall = 11;
            } else {
              img1.src = safeopen;
              currentWall = 12;
            }
          }
          break;
        case 6: //popupcloseknife
          if ((x >= 0 && x < 64 && y >= 0 && y <= 56) || asrtext === "ย้อนกลับ") {
            img1.src = roomBoxSafeKnife;
            currentWall = 1;
          }
          break;
        case 7: //popupclosenoknife
          if ((x >= 0 && x < 64 && y >= 0 && y <= 56) || asrtext === "ย้อนกลับ") {
            img1.src = roomBoxSafeNoknife;
            currentWall = 4;
          } else if ((x >= 380 && x < 580 && y >= 160 && y <= 380 && hasKnife === true) || asrtext === "ใช้มีดเปิดกล่อง") {
            isBoxOpen = true;
            img1.src = popupBoxOpenWithPassword;
            currentWall = 8;
          }
          break;
        case 8: //popupopenbox
          if ((x >= 0 && x < 64 && y >= 0 && y <= 56) || asrtext === "ย้อนกลับ") {
            img1.src = roomOpenboxSafeNoknife;
            currentWall = 5;
          }
          break;
        case 9: // leftdesk
          if ((x >= 0 && x < 64 && y >= 0 && y <= 56) || asrtext === "ย้อนกลับ") {
            hasKey = true;
            img1.src = roomOpenboxSafeNoknife;
            currentWall = 5;
          }
          break;
        case 10: // door
          if ((x >= 0 && x < 64 && y >= 0 && y <= 56) || asrtext === "ย้อนกลับ") {
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
          } else if ((x >= 309 && x < 651 && y >= 0 && y <= 491) || asrtext === "ใช้กุญแจเปิดประตู") { //กดประตูเพื่อเปิด
            if (hasKey) {
              console.log("จบ")
              setTimeout(function () {
                ctx.font = "150px Roboto";
                ctx.fillText("จบแล้วจ้า", canvas.width / 2 - 300, canvas.height / 2);
              }, 20);
            }
          }
          break;
        case 11:
          if (asrtext.parseInt != NaN) {
            ctx.fillText(asrtext, 465, 302);
          }
          if (asrtext === '44'){
            setTimeout(function () {
              img1.src = safeopen;
              currentWall = 12;
              item2.src = keyImage;
              hasKey = true;
            }, 30);
          }
          if ((x >= 0 && x < 64 && y >= 0 && y <= 56) || asrtext === "ย้อนกลับ") {
            if (hasKnife === true && isBoxOpen === false) {
              img1.src = roomBoxSafeNoknife;
              currentWall = 4;
            } else if (hasKnife === false) {
              img1.src = roomBoxSafeKnife;
              currentWall = 1;
            } else if (isBoxOpen === false && hasKnife === true) {
              img1.src = roomOpenboxSafeNoknife;
              currentWall = 5;
            }
          } else if (x >= 476 && x < 492 && y >= 375 && y <= 387) {
            if (playerPass.length === 2) {
              playerPass = '';
            }
            playerPass += '0';
            img1.src = safeclose;
            setTimeout(function () {
              ctx.fillText(playerPass, 465, 302);
            }, 20);
            if (playerPass === '44') {
              img1.src = safeopen;
              currentWall = 12;
              item2.src = keyImage;
              hasKey = true;
            }
            console.log(playerPass);
          } else if (x >= 444 && x < 463 && y >= 325 && y <= 338) {
            if (playerPass.length === 2) {
              playerPass = '';
            }
            playerPass += '1';
            img1.src = safeclose;
            setTimeout(function () {
              ctx.fillText(playerPass, 465, 302);
            }, 20);
            if (playerPass === '44') {
              img1.src = safeopen;
              currentWall = 12;
              item2.src = keyImage;
              hasKey = true;
            }
            console.log(playerPass);
          } else if (x >= 476 && x < 492 && y >= 325 && y <= 338) {
            if (playerPass.length === 2) {
              playerPass = '';
            }
            playerPass += '2';
            img1.src = safeclose;
            setTimeout(function () {
              ctx.fillText(playerPass, 465, 302);
            }, 20);
            if (playerPass === '44') {
              img1.src = safeopen;
              currentWall = 12;
              item2.src = keyImage;
              hasKey = true;
            }
            console.log(playerPass);
          } else if (x >= 505 && x < 521 && y >= 325 && y <= 338) {
            if (playerPass.length === 2) {
              playerPass = '';
            }
            playerPass += '3';
            img1.src = safeclose;
            setTimeout(function () {
              ctx.fillText(playerPass, 465, 302);
            }, 20);
            if (playerPass === '44') {
              img1.src = safeopen;
              currentWall = 12;
              item2.src = keyImage;
              hasKey = true;
            }
            console.log(playerPass);
          } else if (x >= 444 && x < 463 && y >= 343 && y <= 354) {
            if (playerPass.length === 2) {
              playerPass = '';
            }
            playerPass += '4';
            img1.src = safeclose;
            setTimeout(function () {
              ctx.fillText(playerPass, 465, 302);
            }, 20);
            if (playerPass === '44') {
              setTimeout(function () {
                img1.src = safeopen;
                currentWall = 12;
                item2.src = keyImage;
                hasKey = true;
              }, 30);
            }
            console.log(playerPass);
          } else if (x >= 476 && x < 492 && y >= 343 && y <= 354) {
            if (playerPass.length === 2) {
              playerPass = '';
            }
            playerPass += '5';
            img1.src = safeclose;
            setTimeout(function () {
              ctx.fillText(playerPass, 465, 302);
            }, 20);
            if (playerPass === '44') {
              img1.src = safeopen;
              currentWall = 12;
              item2.src = keyImage;
              hasKey = true;
            }
            console.log(playerPass);
          } else if (x >= 505 && x < 521 && y >= 343 && y <= 354) {
            if (playerPass.length === 2) {
              playerPass = '';
            }
            playerPass += '6';
            img1.src = safeclose;
            setTimeout(function () {
              ctx.fillText(playerPass, 465, 302);
            }, 20);
            if (playerPass === '44') {
              img1.src = safeopen;
              currentWall = 12;
              item2.src = keyImage;
              hasKey = true;
            }
            console.log(playerPass);
          } else if (x >= 444 && x < 463 && y >= 359 && y <= 371) {
            if (playerPass.length === 2) {
              playerPass = '';
            }
            playerPass += '7';
            img1.src = safeclose;
            setTimeout(function () {
              ctx.fillText(playerPass, 465, 302);
            }, 20);
            if (playerPass === '44') {
              img1.src = safeopen;
              currentWall = 12;
              item2.src = keyImage;
              hasKey = true;
            }
            console.log(playerPass);
          } else if (x >= 476 && x < 492 && y >= 359 && y <= 371) {
            if (playerPass.length === 2) {
              playerPass = '';
            }
            playerPass += '8';
            img1.src = safeclose;
            setTimeout(function () {
              ctx.fillText(playerPass, 465, 302);
            }, 20);
            if (playerPass === '44') {
              img1.src = safeopen;
              currentWall = 12;
              item2.src = keyImage;
              hasKey = true;
            }
            console.log(playerPass);
          } else if (x >= 505 && x < 521 && y >= 359 && y <= 371) {
            if (playerPass.length === 2) {
              playerPass = '';
            }
            playerPass += '9';
            img1.src = safeclose;
            setTimeout(function () {
              ctx.fillText(playerPass, 465, 302);
            }, 20);
            if (playerPass === '44') {
              img1.src = safeopen;
              currentWall = 12;
              item2.src = keyImage;
              hasKey = true;
            }
            console.log(playerPass);
          }
          break;
        case 12:
          if (x >= 0 && x < 64 && y >= 0 && y <= 56) {
            if (hasKnife === true && isBoxOpen === false) {
              img1.src = roomBoxSafeNoknife;
              currentWall = 4;
            } else if (hasKnife === false) {
              img1.src = roomBoxSafeKnife;
              currentWall = 1;
            } else if (isBoxOpen === true && hasKnife === true) {
              img1.src = roomOpenboxSafeNoknife;
              currentWall = 5;
            }
          }
          break;
        default:
          break;
      }
    }
//END From componentDidMount-----------------------------------------------------------


function changeImage2(asrtextkub) {
  console.log("asrtextkub")
  console.log(asrtextkub)
  asrtextkub = asrtextkub.replaceAll(" ", "");
  asrtextkub = asrtextkub.replaceAll(".", "");
  asrtextkub = asrtextkub.replaceAll("ศูนย์", "0");
  asrtextkub = asrtextkub.replaceAll("หนึ่ง", "1");
  asrtextkub = asrtextkub.replaceAll("สอง", "2");
  asrtextkub = asrtextkub.replaceAll("สาม", "3");
  asrtextkub = asrtextkub.replaceAll("สี่", "4");
  asrtextkub = asrtextkub.replaceAll("ห้า", "5");
  asrtextkub = asrtextkub.replaceAll("หก", "6");
  asrtextkub = asrtextkub.replaceAll("เจ็ด", "7");
  asrtextkub = asrtextkub.replaceAll("แปด", "8");
  asrtextkub = asrtextkub.replaceAll("เก้า", "9");
  console.log("asrtextkub after replace")
  console.log(asrtextkub)
  switch (currentWall) {
    case 1: //room with everything
      if (asrtextkub.indexOf("ดูตู้ข้างขวา") >= 0) {
        img1.src = knife;
        currentWall = 2;
        clearTranscription()
      } else if (asrtextkub.indexOf("ดูกล่อง") >= 0) {
        img1.src = popupCloseboxWithKnifeInroom;
        currentWall = 6;
        clearTranscription()
      } else if (asrtextkub.indexOf("ดูตู้ข้างซ้าย") >= 0) {
        if (hasKey === false) {
          img1.src = safeclose;
          currentWall = 11;
          clearTranscription()
        } else {
          img1.src = safeopen;
          currentWall = 12;
          clearTranscription()
        }
      } else if (asrtextkub.indexOf("ดูประตู") >= 0) { //กดประตู
        img1.src = door;
        currentWall = 10;
        clearTranscription()
      }
      break;
    case 2: //ตู้ขวา with knife
      if (asrtextkub.indexOf("หยิบมีด") >= 0) {
        img1.src = noknife;
        hasKnife = true;
        currentWall = 3;
        item1.src = knifeImage;
        clearTranscription()
      } else if (asrtextkub.indexOf("ย้อนกลับ") >= 0) {
        img1.src = roomBoxSafeKnife;
        currentWall = 1;
        clearTranscription()
      }
      break;
    case 3: //ตู้ขวา without knife
      if (asrtextkub.indexOf("ย้อนกลับ") >= 0) {
        if (isBoxOpen === false) {
          img1.src = roomBoxSafeNoknife;
          currentWall = 4;
          clearTranscription()
        } else if (isBoxOpen === true) {
          img1.src = roomOpenboxSafeNoknife;
          currentWall = 5;
          clearTranscription()
        }
      }
      break;
    case 4: //room with everything except knife
      if (asrtextkub.indexOf("ดูตู้ข้างขวา") >= 0) {
        img1.src = noknife;
        currentWall = 3;
        clearTranscription()
      } else if (asrtextkub.indexOf("ดูกล่อง") >= 0) {
        img1.src = popupCloseboxWithoutKnifeInroom;
        currentWall = 7;
        clearTranscription()
      } else if (asrtextkub.indexOf("ดูประตู") >= 0) { //กดประตู
        img1.src = door;
        currentWall = 10;
        clearTranscription()
      } else if (asrtextkub.indexOf("ดูตู้ข้างซ้าย") >= 0) {
        if (hasKey === false) {
          img1.src = safeclose;
          currentWall = 11;
          clearTranscription()
        } else {
          img1.src = safeopen;
          currentWall = 12;
          clearTranscription()
        }
      }
      break;
    case 5: //ห้องที่กล่องเปิดแล้ว
      if (asrtextkub.indexOf("ดูตู้ข้างขวา") >= 0) {
        img1.src = noknife;
        currentWall = 3;
        clearTranscription()
      } else if (asrtextkub.indexOf("ดูประตู") >= 0) { //กดประตู
        img1.src = door;
        currentWall = 10; 
        clearTranscription()
      } else if (asrtextkub.indexOf("ดูตู้ข้างซ้าย") >= 0) {
        if (hasKey === false) {
          img1.src = safeclose;
          currentWall = 11;
          clearTranscription()
        } else {
          img1.src = safeopen;
          currentWall = 12;
          clearTranscription()
        }
      }
      break;
    case 6: //popupcloseknife
      if (asrtextkub.indexOf("ย้อนกลับ") >= 0) {
        img1.src = roomBoxSafeKnife;
        currentWall = 1;
        clearTranscription()
      }
      break;
    case 7: //popupclosenoknife
      if (asrtextkub.indexOf("ย้อนกลับ") >= 0) {
        img1.src = roomBoxSafeNoknife;
        currentWall = 4;
        clearTranscription()
      } else if (asrtextkub.indexOf("ใช้มีดเปิดกล่อง") >= 0) {
        isBoxOpen = true;
        img1.src = popupBoxOpenWithPassword;
        currentWall = 8;
        clearTranscription()
      }
      break;
    case 8: //popupopenbox
      if (asrtextkub.indexOf("ย้อนกลับ") >= 0) {
        img1.src = roomOpenboxSafeNoknife;
        currentWall = 5;
        clearTranscription()
      }
      break;
    case 9: // leftdesk
      if (asrtextkub.indexOf("ย้อนกลับ") >= 0) {
        hasKey = true;
        img1.src = roomOpenboxSafeNoknife;
        currentWall = 5;
        clearTranscription()
      }
      break;
    case 10: // door
      if (asrtextkub.indexOf("ย้อนกลับ") >= 0) {
        if (isBoxOpen === true) {
          img1.src = roomOpenboxSafeNoknife;
          currentWall = 5;
          clearTranscription()
        } else if (hasKnife === true && isBoxOpen === false) {
          img1.src = roomBoxSafeNoknife;
          currentWall = 4;
          clearTranscription()
        } else if (hasKnife === false) {
          img1.src = roomBoxSafeKnife;
          currentWall = 1;
          clearTranscription()
        }
      } else if (asrtextkub.indexOf("ใช้กุญแจเปิดประตู") >= 0) { //กดประตูเพื่อเปิด
        if (hasKey) {
          console.log("จบ")
          setTimeout(function () {
            ctx.font = "150px Roboto";
            ctx.fillText("จบแล้วจ้า", canvas.width / 2 - 300, canvas.height / 2);
          }, 20);
        }
        clearTranscription()
      }
      break;
    case 11:
      asrtextkub = asrtextkub.replace(/\D/g,'');
      if (!isNaN(parseInt(asrtextkub))) {
        ctx.fillText(asrtextkub, 465, 302);
      }
      if (asrtextkub.indexOf("44") >= 0) {
        setTimeout(function () {
          img1.src = safeopen;
          currentWall = 12;
          item2.src = keyImage;
          hasKey = true;
        }, 30);
        clearTranscription()
      }
      if (asrtextkub.indexOf("ย้อนกลับ") >= 0) {
        if (hasKnife === true && isBoxOpen === false) {
          img1.src = roomBoxSafeNoknife;
          currentWall = 4;
          clearTranscription()
        } else if (hasKnife === false) {
          img1.src = roomBoxSafeKnife;
          currentWall = 1;
          clearTranscription()
        } else if (isBoxOpen === false && hasKnife === true) {
          img1.src = roomOpenboxSafeNoknife;
          currentWall = 5;
          clearTranscription()
        }
      } 
      break;
    case 12:
      if (asrtextkub.indexOf("ย้อนกลับ") >= 0) {
        if (hasKnife === true && isBoxOpen === false) {
          img1.src = roomBoxSafeNoknife;
          currentWall = 4;
          clearTranscription()
        } else if (hasKnife === false) {
          img1.src = roomBoxSafeKnife;
          currentWall = 1;
          clearTranscription()
        } else if (isBoxOpen === true && hasKnife === true) {
          img1.src = roomOpenboxSafeNoknife;
          currentWall = 5;
          clearTranscription()
        }
      }
      break;
    default:
      break;
  }
}
//



// Extend from demo.js

var tt = new Transcription();

var dictate = new Dictate({
		server : "ws://127.0.0.1:8080/client/ws/speech",
		serverStatus : "ws://127.0.0.1:8080/client/ws/status",
		recorderWorkerPath : '../lib/recorderWorker.js',
		onReadyForSpeech : function() {
			__message("READY FOR SPEECH");
			__status("Kuulan ja transkribeerin...");
		},
		onEndOfSpeech : function() {
			__message("END OF SPEECH");
			__status("Transkribeerin...");
		},
		onEndOfSession : function() {
			__message("END OF SESSION");
			__status("");
		},
		onServerStatus : function(json) {
			__serverStatus(json.num_workers_available + ':' + json.num_requests_processed);
			if (json.num_workers_available == 0) {
				$("#buttonStart").prop("disabled", true);
				$("#serverStatusBar").addClass("highlight");
			} else {
				$("#buttonStart").prop("disabled", false);
				$("#serverStatusBar").removeClass("highlight");
			}
		},
		onPartialResults : function(hypos) {
			// TODO: demo the case where there are more hypos
			tt.add(hypos[0].transcript, false);
			__updateTranscript(tt.toString());
		},
		onResults : function(hypos) {
			// TODO: demo the case where there are more results
			tt.add(hypos[0].transcript, true);
			console.log('hypos')
			console.log(hypos)
			__updateTranscript(tt.toString());
			changeImage2(tt.toString())
			// diff() is defined only in diff.html
			if (typeof(diff) == "function") {
				diff();
			}
		},
		onError : function(code, data) {
			__error(code, data);
			__status("Viga: " + code);
			dictate.cancel();
		},
		onEvent : function(code, data) {
			__message(code, data);
		}
	});

// Private methods (called from the callbacks)
function __message(code, data) {
	log.innerHTML = "msg: " + code + ": " + (data || '') + "\n" + log.innerHTML;
}

function __error(code, data) {
	log.innerHTML = "ERR: " + code + ": " + (data || '') + "\n" + log.innerHTML;
}

function __status(msg) {
	statusBar.innerHTML = "status " + msg;
}

function __serverStatus(msg) {
	serverStatusBar.innerHTML = "serverstatus " + msg;
}

function __updateTranscript(text) {
	$("#trans").val(text);
}

// Public methods (called from the GUI)
function toggleLog() {
	$(log).toggle();
}
function clearLog() {
	log.innerHTML = "";
}

function clearTranscription() {
	tt = new Transcription();
	$("#trans").val("");
}

function startListening() {
	dictate.startListening();
}

function stopListening() {
	dictate.stopListening();
}

function cancel() {
	dictate.cancel();
}

function init() {
	dictate.init();
}

function showConfig() {
	var pp = JSON.stringify(dictate.getConfig(), undefined, 2);
	log.innerHTML = pp + "\n" + log.innerHTML;
	$(log).show();
}

window.onload = function() {
	init();
};
