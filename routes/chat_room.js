
 var express = require('express');
 var router = express.Router();
var rootpath=process.env.PWD;
var app = require('express')();



app.set('port', process.env.PORT || 5000);
//app.set('port', process.env.PORT || 3000);
//app.set("view options", {layout: false});  //This one does the trick for rendering static html
//app.engine('html', require('ejs').renderFile); 
var http = require('http').Server(app);

var io = require('socket.io')(http);

//io.emit('recieve', { for: 'everyone' });

  



router.get('/', function(req, res){
  res.sendFile(rootpath+'/public/html/chat_room.html');
});

 io.on('connection', function (socket) {
  //socket.emit('recieve', { msg: 'world' });
   io.on('recieve', function (data) {
     console.log(data);
   });
  socket.on('send', function (data) {
    //socket.broadcast.emit('recieve', { msg: data.msg });
    io.emit('recieve', { msg: data.msg });
  });
  socket.on('ack', function (name, fn) {
    fn('Sent');
  });
  
});

// io.on('connection', function(socket){
//   console.log('a user connected');
// });
      // http.listen(3000, function(req,res){
      //    console.log('listening on :5000');
      //   });
// var server = http.createServer(app).listen(3000, function() {
//     console.log('Https App started');
// });



     

 // http.createServer(app).listen(3000, function(){ 
 //   console.log('listening on *:3000');
 // });

module.exports = router;
