
 var express = require('express');
// var app = express();
 var router = express.Router();
// //var http = require('http').Server(app);
// var http = require('http');

var app = require('express')();
app.set('port', process.env.PORT || 5000);
var http = require('http').Server(app);
var rootpath=process.env.PWD;
var io = require('socket.io')(http);

//console.log(http);
io.emit('recieve', { for: 'everyone' });

router.get('/', function(req, res){
  res.sendFile(rootpath+'/html/chat_room.html');
});

 io.on('connection', function (socket) {
  //socket.emit('recieve', { msg: 'world' });
   socket.on('recieve', function (data) {
     console.log(data);
   });
  socket.on('send', function (data) {
    //console.log(data);
    socket.emit('recieve', { msg: data.msg });
  });
});

// io.on('connection', function(socket){
//   console.log('a user connected');
// });
      http.listen(5000, function(req,res){
         console.log('listening on :5000');
        });
// var server = http.createServer(app).listen(3000, function() {
//     console.log('Https App started');
// });



     

 // http.createServer(app).listen(3000, function(){ 
 //   console.log('listening on *:3000');
 // });

module.exports = router;
