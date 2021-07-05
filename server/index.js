/* 
TO DO: 
FIX ACTION NAMES
ADD SECURITY FOR ADMIN PANEL
ADD PROP TYPES
*/

const ChatServer = require("./ChatServer");
var http = require("http");
const express = require("express");
const path = require("path");
require("dotenv").config();
const port = process.env.WEB_PORT || 3000;

console.log(
  "\x1b[32m",
  "================================================================================",
  "\x1b[0m"
);

const app = new express();
var server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, "../app/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../app/build/index.html"));
});

server.listen(port, () => {
  console.log(` > Web server is listening on: ${port} port.`);

  let chatServer = new ChatServer();
  chatServer.start(server);
  chatServer.setJoinQuitLogging(process.env.LOG_JOINQUIT);
  chatServer.setMessageLogging(process.env.LOG_MESSAGES);

  console.log(
    "\x1b[32m",
    "================================================================================",
    "\x1b[0m",
    "\n"
  );
});