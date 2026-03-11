// // const cluster = require('cluster');
// // const express = require('express');

// // if(cluster.isMaster){
// //     console.log(`The Master ID is ${process.pid}`);
// //     cluster.fork();
// //     cluster.fork();
// // }else{
// //     const app = express();
// //     app.get("/home", (req, res) => {
// //        console.log(`process Id is ${process.pid}`)
// //         res.send("Home Page")
// //     });

// //     app.get("/about", (req, res) => {
// //         for(let i = 0; i < 1e9 * 100; i++) {};
// //        console.log(`process Id is ${process.pid}`);
// //         res.send("About Page")
// //     });

// //     app.listen(3000);
// // }

// const os = require('os');

// console.log(os.freemem() / 1024);

const fs = require("fs");

fs.readFile(__filename, () => {
  console.log("file");

  setTimeout(() => console.log("timeout"), 0);
});

setImmediate(() => console.log("immediate"));

