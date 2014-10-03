var mraa = require('mraa'), //require mraa
app = require('http').createServer(handler),
io = require('socket.io').listen(app),
fs = require('fs'), 
_ = require('lodash'),
//PWMPins
ledPins = {
    0:{ pin:3, led:null, state: 1, delay: 2000, running: true},
    1:{ pin:5, led:null, state: 1, delay: 2000, running: true},
    2:{ pin:6, led:null, state: 1, delay: 2000, running: true},
    3:{ pin:9, led:null, state: 1, delay: 2000, running: true},
    4:{ pin:10, led:null, state: 1, delay: 2000, running: true}
};


photoPins = {
    0:{ pin: 0, sensor: null },
    1:{ pin: 1, sensor: null },
    2:{ pin: 2, sensor: null },
    3:{ pin: 3, sensor: null },
    4:{ pin: 4,sensor: null },
};


console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console

_.forEach(ledPins, function(index){
    index.led = new mraa.Gpio(index.pin);
    index.state = 1;
    index.led.dir(mraa.DIR_OUT);
    index.led.write(index.state);
		index.led.write(0);
});

//var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
//var analogValue = analogPin0.read(); //read the value of the analog pin

_.forEach(photoPins, function(index){
    index.sensor = new mraa.Aio(index.pin);
});

led0Delay(ledPins[0]);
led1Delay(ledPins[1]);
led2Delay(ledPins[2]);
led3Delay(ledPins[3]);
led4Delay(ledPins[4]);

photo0Delay(photoPins[0].sensor);
photo1Delay(photoPins[1].sensor);
photo2Delay(photoPins[2].sensor);
photo3Delay(photoPins[3].sensor);
photo4Delay(photoPins[4].sensor);

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
//	console.log("LED1: ", ledData);
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
//	console.log("Photo"+sensor.pin+" data: ", value)
	setTimeout(function() {photo0Delay(sensor);}, 100)
}

function photo1Delay(sensor){
	var value = sensor.read();
	io.sockets.emit('photo1',{ data:value});
//	console.log("Photo"+sensor.pin+" data: ", value)
	setTimeout(function() {photo1Delay(sensor);}, 100)
}

function photo2Delay(sensor){
	var value = sensor.read();
	io.sockets.emit('photo2',{ data:value});
//	console.log("Photo"+sensor.pin+" data: ", value)
	setTimeout(function() {photo2Delay(sensor);}, 100)
}

function photo3Delay(sensor){
	var value = sensor.read();
	io.sockets.emit('photo3',{ data:value});
//	console.log("Photo"+sensor.pin+" data: ", value)
	setTimeout(function() {photo3Delay(sensor);}, 100)
}

function photo4Delay(sensor){
	var value = sensor.read();
	io.sockets.emit('photo4',{ data:value});		
//	console.log("Photo"+sensor.pin+" data: ", value)
	setTimeout(function() {photo4Delay(sensor);}, 100)
}



//=======================================================================================================
// SOCKET.IO

// handle web server
function handler (req, res) {
  fs.readFile(__dirname + '/public/views/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

//    console.log("Server started");
    res.writeHead(200);
    res.end(data);
  });
}

// make web server listen on port 80
app.listen(3000);

io.sockets.on('connection', function(socket){
		
		socket.on('onOff', function(data) {
//			console.log("got the call", data);
			ledPins[parseInt(data.pin)].running = data.status;
//			console.log(parseInt(ledPins[data.pin]));
		});
	
    // if led delay message emitted
    socket.on('led', function (data) {
//        console.log("********SET*******",data);
        ledPins[parseInt(data.pin)].delay = data.interval;    
    });

    
});

