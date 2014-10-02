/*
A simple node.js application intended to blink the onboard LED on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

The intent is to make it easier for developers and sensor manufacturers to map their sensors & actuators on top of supported hardware and to allow control of low level communication protocol by high level languages & constructs.
*/

var mraa = require('mraa'), //require mraa
app = require('http').createServer(handler),
io = require('socket.io').listen(app),
fs = require('fs'),
_ = require('lodash'),
//PWMPins
ledPins = {
    0:{ pin:3, led:null, state: 0, delay: 400},
    1:{ pin:5, led:null, state: 0, delay: 400},
    2:{ pin:6, led:null, state: 0, delay: 400},
    3:{ pin:9, led:null, state: 0, delay: 400},
    4:{ pin:10, led:null, state: 0, delay: 400}
};

//photoPins = {
//    0:{ "pin":3, "sensor":null },
//    1:{ "pin":5, "sensor":null },
//    2:{ "pin":6, "sensor":null }, f
//    3:{ "pin":9, "sensor":null },
//    4:{ "pin":10, "sensor":null },
//    5:{ "pin":11, "sensor":null }
//};


console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console

_.forEach(ledPins, function(index){
    index.led = new mraa.Gpio(index.pin);
    index.state = 1;
    index.led.dir(mraa.DIR_OUT);
    index.led.write(index.state);
});

led0Delay(ledPins[0]);
led1Delay(ledPins[1]);
led2Delay(ledPins[2]);
led3Delay(ledPins[3]);
led4Delay(ledPins[4]);

function led0Delay(ledData){
    if(ledData.state){
        setState(ledData);
        setTimeout(function() {led0Delay(ledData);}, ledData.delay);
    } else {
        setState(ledData);
        setTimeout(function() {led0Delay(ledData);}, 200);
    }
}

function led1Delay(ledData){
    if(ledData.state){
        setState(ledData);
        setTimeout(function() {led1Delay(ledData);}, ledData.delay);
    } else {
        setState(ledData);
        setTimeout(function() {led1Delay(ledData);}, 200);
    }
}
function led2Delay(ledData){
    if(ledData.state){
        setState(ledData);
        setTimeout(function() {led2Delay(ledData);}, ledData.delay);
    } else {
        setState(ledData);
        setTimeout(function() {led2Delay(ledData);}, 200);
    }
}
function led3Delay(ledData){
    if(ledData.state){
        setState(ledData);
        setTimeout(function() {led3Delay(ledData);}, ledData.delay);
    } else {
        setState(ledData);
        setTimeout(function() {led3Delay(ledData);}, 200);
    }
}
function led4Delay(ledData){
    if(ledData.state){
        setState(ledData);
        setTimeout(function() {led4Delay(ledData);}, ledData.delay);
    } else {
        setState(ledData);
        setTimeout(function() {led4Delay(ledData);}, 200);
    }
}

function setState(ledData){
    if(ledData.state == 0){
        ledData.state = 1;
    } else {
        ledData.state = 0;
    }
        ledData.led.write(ledData.state);
}

//=======================================================================================================
// SOCKET.IO SHIT

// handle web server
function handler (req, res) {
  fs.readFile(__dirname + '/public/views/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    console.log("Server started");
    res.writeHead(200);
    res.end(data);
  });
}

// make web server listen on port 80
app.listen(3000);

io.sockets.on('connection', function(socket){
    socket.emit('news', { hello: 'world' });

    // if led message emitted
    socket.on('led', function (data) {
        console.log(data);
        ledPins[data.pin].delay = data.interval;    
    });
});

//  // poll this sensor every second
//  sensor = new five.Sensor({
//    pin: "A0",
//    freq: 1000
//  });
//
//});
//
//
//
//
//
//// on a socket connection
//io.sockets.on('connection', function (socket) {
//  socket.emit('news', { hello: 'world' });
//
//
//  // if led message received
//  socket.on('led', function (data) {
//    console.log(data);
//     if(board.isReady){    led.strobe(data.delay); }
//  });
//
//});

//var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
//var analogValue = analogPin0.read(); //read the value of the analog pin