// // const { WebSocketServer } = require("ws");

// // const wss = new WebSocketServer({ port: 8080 });

// // //Syntex
// // wss.on("connection", (socket) => {
// //   // console.log("A new connection was made")
// //   socket.on("message", (msg) => {
// //     console.log("Client " + msg)
// //     if (msg.toString() === "Hey") {
// //       socket.send("Hello");
// //     } else if (msg.toString() === "bye") {
// //       socket.send("ta ta");
// //     } else {
// //       socket.send("see you");
// //     }
// //   });
// // });

// // //   socket.on("close",()=>{
// // //     console.log("Client disconnected")
// // //   }) 


//  const {EventEmitter}  = require("events")


//  const Button = new EventEmitter()


// //event handling
// Button.on("click",()=>{
//   console.log("Button is clicked")
// })

// Button.on("xyz",()=>{
//   console.log("something is happened")
// })




// //event triggered
// Button.emit("click")
// Button.emit("xyz")