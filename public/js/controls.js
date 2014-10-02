      var socket = io.connect('http://localhost');

      socket.on('news', function (data) {
        console.log(data);
      });

      socket.on('sensor', function (data) {
        console.log("Incoming sensor data:",data.raw);
        $("#inData").append(data.raw+"\r");
        $("#inData").animate({scrollTop:$("#inData")[0].scrollHeight - $("#inData").height()},200);

      });

      $('.servobtn').button();

      $('.servobtn').on('change',function(){
          console.log("Setting Servo Pos:",$('input[name=servo]:checked').val())
          socket.emit('servo',{pos:$('input[name=servo]:checked').val()});
      });

      $('#ledSet').on('click',function(){
        var tmp = parseInt($('#ledDelay').val(),10);
        console.log("Setting LED Delay:",tmp)
        socket.emit('led',{delay:tmp});
      });