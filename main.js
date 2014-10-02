var mraa = require('mraa'), //require mraa
app = require('http').createServer(handler),
io = require('socket.io').listen(app),
fs = require('fs'),
_ = require('lodash'),
play = require('play').Play(),
//PWMPins
ledPins = {
    0:{ pin:3, led:null, state: 0, delay: 400, running: false},
    1:{ pin:5, led:null, state: 0, delay: 400, running: false},
    2:{ pin:6, led:null, state: 0, delay: 400, running: false},
    3:{ pin:9, led:null, state: 0, delay: 400, running: false},
    4:{ pin:10, led:null, state: 0, delay: 400, running: false}
};

//
//  // play with a callback
//  play.sound('./wavs/sfx/intro.wav', function(){
//
//    // these are all "fire and forget", no callback
//    play.sound('./wavs/sfx/alarm.wav');
//    play.sound('./wavs/sfx/crinkle.wav');
//    play.sound('./wavs/sfx/flush.wav');
//    play.sound('./wavs/sfx/ding.wav');
//
//  });
//
//  //If you want to know when the player has defintely started playing
//  play.on('play', function (valid) {
//    console.log('I just started playing!');
//  });
//  play.sound('./wavs/sfx/ding.wav');
//
//  //If you want to know if this can't play for some reason
//  play.on('error', function () {
//    console.log('I can't play!');
//  });



photoPins = {
    0:{ pin: "0", sensor: null },
    1:{ pin: "1", sensor: null },
    2:{ pin: "2", sensor: null },
    3:{ pin: "3", sensor: null },
    4:{ pin: "4",sensor: null },
};


console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console

_.forEach(ledPins, function(index){
    index.led = new mraa.Gpio(index.pin);
    index.state = 1;
    index.led.dir(mraa.DIR_OUT);
    index.led.write(index.state);
});



_.forEach(photoPins, function(index){
    index.sensor = new mraa.Aio(index.pin);
});

led0Delay(ledPins[0]);
led1Delay(ledPins[1]);
led2Delay(ledPins[2]);
led3Delay(ledPins[3]);
led4Delay(ledPins[4]);

function led0Delay(ledData){
    if(ledData.running){
        if(ledData.state){
            setState(ledData);
            setTimeout(function() {led0Delay(ledData);}, ledData.delay);
        } else {
            setState(ledData);
            setTimeout(function() {led0Delay(ledData);}, 200);
        }
    }
}


function led1Delay(ledData){
    if(ledData.running){
        if(ledData.state){
            setState(ledData);
            setTimeout(function() {led1Delay(ledData);}, ledData.delay);
        } else {
            setState(ledData);
            setTimeout(function() {led1Delay(ledData);}, 200);
        }
    }
}
function led2Delay(ledData){
    if(ledData.running){
        if(ledData.state){
            setState(ledData);
            setTimeout(function() {led2Delay(ledData);}, ledData.delay);
        } else {
            setState(ledData);
            setTimeout(function() {led2Delay(ledData);}, 200);
        }
    }
}
function led3Delay(ledData){
    if(ledData.running){
        if(ledData.state){
            setState(ledData);
            setTimeout(function() {led3Delay(ledData);}, ledData.delay);
        } else {
            setState(ledData);
            setTimeout(function() {led3Delay(ledData);}, 200);
        }
    }
}
function led4Delay(ledData){
    if(ledData.running){
        if(ledData.state){
            setState(ledData);
            setTimeout(function() {led4Delay(ledData);}, ledData.delay);
        } else {
            setState(ledData);
            setTimeout(function() {led4Delay(ledData);}, 200);
        }
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


function photo0Delay(sensor){
	var value = sensor.read();
	io.sockets.emit('photo0',{ data:value});
	console.log("Photo"+sensor.pin+" data: ", value)
	setTimeout(function() {photo0Delay(sensor);}, 100)
}

function photo1Delay(sensor){
	var value = sensor.read();
	io.sockets.emit('photo1',{ data:value});
	console.log("Photo"+sensor.pin+" data: ", value)
	setTimeout(function() {photo1Delay(sensor);}, 100)
}

function photo2Delay(sensor){
	var value = sensor.read();
	io.sockets.emit('photo2',{ data:value});
	console.log("Photo"+sensor.pin+" data: ", value)
	setTimeout(function() {photo2Delay(sensor);}, 100)
}

function photo3Delay(sensor){
	var value = sensor.read();
	io.sockets.emit('photo3',{ data:value});
	console.log("Photo"+sensor.pin+" data: ", value)
	setTimeout(function() {photo3Delay(sensor);}, 100)
}

function photo4Delay(sensor){
	var value = sensor.read();
	io.sockets.emit('photo4',{ data:value});
	console.log("Photo"+sensor.pin+" data: ", value)
	setTimeout(function() {photo4Delay(sensor);}, 100)
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
		
    // if led delay message emitted
    socket.on('led', function (data) {
        console.log(data);
        ledPins[data.pin].delay = data.interval;    
    });
    
    // if switch message emitted
    socket.on('switch', function (data) {
    console.log(data);
    ledPins[data.pin].functional
  });

    
});

//var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
//var analogValue = analogPin0.read(); //read the value of the analog pin