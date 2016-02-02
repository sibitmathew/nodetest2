
 var express = require('express');
 var router = express.Router();
var rootpath=process.env.PWD;
var app = require('express')();
var WebSocketServer = require("ws").Server;
var http = require("http");


app.set('port', process.env.PORT || 5000);
//app.set('port', process.env.PORT || 5000);
//app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002); 
//app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");  
//app.set("view options", {layout: false});  //This one does the trick for rendering static html
//app.engine('html', require('ejs').renderFile); 
//var http = require('http').Server(app);
//var http = require('http');

//var io = require('socket.io').listen(http);

//io.emit('recieve', { for: 'everyone' });





router.get('/', function(req, res){
  res.sendFile(rootpath+'/public/html/chat_room.html');
});


var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})

//  io.on('connection', function (socket) {
//   //socket.emit('recieve', { msg: 'world' });
//    socket.on('recieve', function (data) {
//      console.log(data);
//    });
//   socket.on('send', function (data) {
//     //socket.broadcast.emit('recieve', { msg: data.msg });
//     io.emit('recieve', { msg: data.msg });
//   });
//   socket.on('ack', function (name, fn) {
//     fn('Sent');
//   });
  
// });

 // http.createServer(app).listen(app.get('port') ,app.get('ipaddr'), function () {
 //     console.log("Express server listening at %s:%d ", app.get('ipaddr'),app.get('port'));
 //     server();
 // });



         // http.listen(5000, function(req,res){
         //   console.log('listening on :5000');
         //   });




     

 // http.createServer(app).listen(3000, function(){ 
 //   console.log('listening on *:3000');
 // });

module.exports = router;
