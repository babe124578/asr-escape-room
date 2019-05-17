ASR Escape Room Project
===
ASR escape room project for ASR Class 2018/2 by กินอะไรดี V.2

# How to run

### Setup GStreamer server
The server is the normal server using the model provided in this repository. The default host setup is localhost:8080. This value can be changed in demo/app.js at variable name dictate.

You can run the Gstreamer server by using this command

` docker run -it -p 8080:80 -v <path_to_model>:/opt/models burin010n/kaldi-gstreamer-server:latest /bin/bash`

When you are in Gstreamer server command line, you can finally start the server by using this command

` /opt/start.sh -y /opt/models/sample_nnet2.yaml`

Check if the process starts successfully by looking at the log file at /opt/worker.log see it starts sucessfully. Usually it will fails if you put the wrong paths to some files.

### Start up the escape room game application
Start the program by openning the demo/app.html

**Remark: please open the demo/app.html by using the lastest version of `firefox browser` in order to use the application smoothly**

# How to use
1.  After starting the program, the web page will be shown.

2.  Allow the web page to access the microphone if required.

3.  Start/Stop - To start recording, press the Start button. After that, say the command you want and then press the Stop button to execute the command or you can leave it recording.

# List of commands available
- ดู ตู้ข้างซ้าย/ตู้ข้างซ้ายขวา/ประตู/กล่อง
- หยิบกุญแจ/มีด
- เปิดกล่อง/ประตู			
- ย้อนกลับ
- ศูนย์ศูนย์ - เก้าเก้า
- ใช้กุญแจเปิดประตู
	
