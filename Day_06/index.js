const express = require("express");
const { Server } = require("socket.io");
const http = require("http");


const app = express();

const server = http.createServer(app);
// console.log(app)

app.get("/", (req, res) => {
  res.send("home page");
});

server.listen(8080, () => {
  console.log("server is listen 8080");
});

const webSocketServer = new Server(server);

let count = 0;

webSocketServer.on("connection", (socket) => {
  count++;
  socket.broadcast.emit("newuser",count)
  socket.emit("xyz", "hello");
  socket.on("mno", (msg) => {
    console.log(msg);
  });
  socket.on("disconnect", () => {
    count--;
    console.log("current count " + count);
  });
});

























































// socket.on("xyz", (msg) => {
//   console.log(msg);
// });this is was an example becuse we wil done this thing on frntend

// app.get("/",(req,res)=>{
//     res.send("home page")
// })

// app.listen(8080,()=>{
//     console.log(`server is listening on port 8080`)
// })

// const { EventEmitter } = require("events");

// const player = new EventEmitter();

// player.on("shot", (number) => {
//   console.log(`Player number ${number} got injured`);
// });

// player.emit("shot", 1);

// //    player.emit("disqualified",3)

// // player.on("dead",(number)=>{
// //     console.log(`Player number ${number} is dead`)
// // })

// // player.on("disqualified",(number)=>{
// //     console.log(`Player number ${number} is disqualified`)
// // })
// // player.emit("dead", 2);
