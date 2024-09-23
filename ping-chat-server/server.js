import express from 'express';
import {createServer} from 'node:http'
import {Server} from 'socket.io'
import cors from 'cors'

const app = express()
app.use(cors())
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
  console.log('New client connected')

  socket.on('message', (message) => {
    console.log('message received', message)
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('client disconnected')
  })
})

const port = process.env.PORT || 8080

server.listen(port, () => console.log('listening on 3001'))
