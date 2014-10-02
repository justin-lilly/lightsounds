//      var socket = io.connect('http://localhost');
//
//      socket.on('news', function (data) {
//        console.log(data);
//      });
//
//      socket.on('sensor', function (data) {
//        console.log("Incoming sensor data:",data.raw);
//        $("#inData").append(data.raw+"\r");
//        $("#inData").animate({scrollTop:$("#inData")[0].scrollHeight - $("#inData").height()},200);
//
//      });
//
//      $('.servobtn').button();
//
//      $('.servobtn').on('change',function(){
//          console.log("Setting Servo Pos:",$('input[name=servo]:checked').val())
//          socket.emit('servo',{pos:$('input[name=servo]:checked').val()});
//      });
//
//      $('#ledSet').on('click',function(){
//        var tmp = parseInt($('#ledDelay').val(),10);
//        console.log("Setting LED Delay:",tmp)
//        socket.emit('led',{delay:tmp});
//      });


$(Document).ready(function(){
  if (count === numLED){
    console.log("Max");
    return;
  }
  console.log("running JQ");
  YUI().use('dial', function(Y) {
      var dial = new Y.Dial({
          min:-220,
          max:220,
          stepsPerRevolution:100,
          value: 30,
          strings:{ label:'LED-'+count, resetStr: 'Off' }
      });
      dials.push(dial);
      dial.render('#pins');
    $('.yui3-dial:last').addClass("col-md-3").attr("pin",count);
    count+=1;
  });
});

$(document).on('mouseup', 'div.yui3-dial', function(){
  // console.log("clicked");
  var LEDpin = $(this).attr('pin');
  var dial = dials[LEDpin];
  var LEDval;
  YUI().use('dial',function(Y){
      LEDval = dial.get('value');
  });
  console.log("pin: ", LEDpin);
  console.log("dial: ", dial);
  console.log("val: ", LEDval);
  $.ajax({
    url: "/controls/update",
    type: "get",
    data:{ pin:LEDpin, val:LEDval},
    success: function(response) {
      console.log("success");
    },
    error: function(xhr) {
      console.log("Error occured");
    }
  });
});