const express = require('express');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors());

const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on('connect', (socket) => {
  console.log(`user connect: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`user id ${socket.id} joined room ${data}`);
  })

  socket.on('msg_send', (data) => {
    socket.to(data?.room).emit("msg_rec",data)
  })

    socket.on('disconnect', () => {
        console.log('user disconnet:',socket.id);
    })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(5000, () => {
  console.log(`Example app listening at http://localhost:5000`)
})