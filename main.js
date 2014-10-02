/*
A simple node.js application intended to blink the onboard LED on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

The intent is to make it easier for developers and sensor manufacturers to map their sensors & actuators on top of supported hardware and to allow control of low level communication protocol by high level languages & constructs.
*/

var mraa = require('mraa'), //require mraa
//app = require('http').createServer(handler),
//io = require('socket.io').listen(app),
//fs = require('fs'),
_ = require('lodash'),
ledPins = {
    0:{ "pin":3, "led":null, "state": false, "delay": 100},
    1:{ "pin":5, "led":null, "state": false, "delay": 100},
    2:{ "pin":6, "led":null, "state": false, "delay": 100},
    3:{ "pin":9, "led":null, "state": false, "delay": 100},
    4:{ "pin":10, "led":null, "state": false, "delay": 100}
//    5:{ "pin":11, "led":null, "state" = false }
}; //PWM Pins

//photoPins = {
//    0:{ "pin":3, "sensor":null },
//    1:{ "pin":5, "sensor":null },
//    2:{ "pin":6, "sensor":null }, f
//    3:{ "pin":9, "sensor":null },
//    4:{ "pin":10, "sensor":null },
//    5:{ "pin":11, "sensor":null }
//};

//var analogPin0 = new mraa.Aio(0);

console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console

_.forEach(ledPins, function(index){
    index.led = new mraa.Gpio(index.pin);
    index.state = true;
    index.led.dir(mraa.DIR_OUT);
    index.led.write(1);
});

//_.forEach(photoPins, function(index){ 
//    index.sensor = new mraa.Aio(index.pin);
//});

//var led0 = new mraa.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Galileo Gen1 & Gen2)
//led0.dir(mraa.DIR_OUT); //set the gpio direction to output
//var led0State = true; //Boolean to hold the state of Led

//periodicActivity(); //call the periodicActivity function
//
//function periodicActivity()
//{
//      led0.write(led0State?1:0); //if led0State is true then write a '1' (high) otherwise write a '0' (low)
//      led0State = !led0State; //invert the led0State
//      setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)
//}

//led0Delay();
//led1Delay();
//led2Delay();
//led3Delay();
//led4Delay();
//led5Delay();


//=======================================================================================================
// SOCKET.IO SHIT
// initialize everything, web server, socket.io, filesystem, johnny-five
//var app = require('http').createServer(handler),
//  io = require('socket.io').listen(app),
//  fs = require('fs'),
//  five = require("johnny-five"),
//  board,servo,led,sensor;

//board = new five.Board({port:"/dev/ttyACM0"});

// on board ready
//board.on("ready", function() {
//
//  // init a led on pin 13, strobe every 1000ms
//  led = new five.Led(13).strobe(1000);
//
//  // setup a stanard servo, center at start
//  servo = new five.Servo({
//    pin:6,
//    range: [0,180],
//    type: "standard",
//    center:true
//  });
//
//  // poll this sensor every second
//  sensor = new five.Sensor({
//    pin: "A0",
//    freq: 1000
//  });
//
//});
//
//// make web server listen on port 80
//app.listen(80);
//
//
//// handle web server
//function handler (req, res) {
//  fs.readFile(__dirname + '/index.html',
//  function (err, data) {
//    if (err) {
//      res.writeHead(500);
//      return res.end('Error loading index.html');
//    }
//
//    res.writeHead(200);
//    res.end(data);
//  });
//}
//
//
//// on a socket connection
//io.sockets.on('connection', function (socket) {
//  socket.emit('news', { hello: 'world' });
//
//  // if board is ready
//  if(board.isReady){
//    // read in sensor data, pass to browser
//    sensor.on("data",function(){
//      socket.emit('sensor', { raw: this.raw });
//    });
//  }
//
//  // if servo message received
//  socket.on('servo', function (data) {
//    console.log(data);
//    if(board.isReady){ servo.to(data.pos);  }
//  });
//  // if led message received
//  socket.on('led', function (data) {
//    console.log(data);
//     if(board.isReady){    led.strobe(data.delay); }
//  });
//
//});

//var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
//var analogValue = analogPin0.read(); //read the value of the analog pin