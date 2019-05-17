ASR escape room project for ASR Class 2018/2 by กินอะไรดี V.2

# How to run

### Setup GStreamer server
The server is the normal server using the model provided in this repository. The default host setup is localhost:8080. This value can be changed in src/component/Microphone.js at variable name dictate.
Start the program by calling npm start

# How to use
After starting the program, the web page will be shown.
Allow the web page to access the microphone if required.
Server status should be shown as AVAILABLE. There are 2 statuses, the first one is for the normal server and the second one is for the wakeword detector.
The program can be operated in 2 modes:
Wakeword mode - This mode can be started by pressing Begin online button. After pressing this button, wakeword status should say RECORDING. After the server detect the wakeword โกวาจี then the status of the normal server will be changed to RECORDING instead. After finish saying the command, the command will be executed and the wakeword server status will be back to RECORDING again, meaning that it's ready to detect another wakeword.
Start/Stop mode - To start recording, press the Start button (Make sure that you are not in the online mode (wakeword mode) or the program might behave incorrectly). After that, say the command you want and then press the Stop button to execute the command.
List of commands available
เปิด <กาชา> [หนึ่ง / สิบ]
เปิด เอา อาจารย์ [เอกพล / อรรถสิทธิ์ / อติวงศ์]
เติม เพชร [สิบ / ร้อย / พัน]
เติม เงิน [สิบ / ร้อย / พัน] บาท
แสดง หน้า คอลเลคชั่น
แสดง หน้า กาชา
[เอา เงิน/ขอ เงิน/กู้ เงิน/ยืม เงิน/ขอ ตัง/ยืม ตัง] อาจารย์ [เอกพล / อรรถสิทธิ์ / อติวงศ์] [สิบ / ร้อย / พัน] บาท
โกง คอลเลคชั่น
โกง เอา อาจารย์ [เอกพล / อรรถสิทธิ์ / อติวงศ์]
โกง เอา [อา / เอส อา / เอ เอส อา]
[หยุด / ข้าม]
