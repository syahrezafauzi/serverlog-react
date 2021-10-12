import { Server } from 'socket.io'

const ioHandler = (req, res) => {
    if(req.method == "GET"){
        if (!res.socket.server.io) {
            console.log('*First use, starting socket.io')
        
            const io = new Server(res.socket.server)
        
            io.on('connection', socket => {
              socket.broadcast.emit('a user connected')
              socket.on('hello', msg => {
                  console.log('msg:', msg)
                socket.emit('hello', msg ?? " world!")
              })
              socket.on('new', msg =>{
                  console.log('broadcast')
                socket.broadcast.emit('new', msg)  
              })
            })
        
            res.socket.server.io = io
          } else {
            console.log('socket.io already running')
          }
    }else{
        var socket = res.socket.server.io
        // console.log('socket:', socket)
        console.log('req.body:', req.body)
        if (!socket){
            console.log('here')
            const io = new Server(res.socket.server)
            io.on('connection', socket => {
                socket.broadcast.emit('a user connected')
                socket.broadcast.emit('new', req.body)
            });
        }else{
            console.log('or')
            // console.log('local:', socket.local)
            socket.local.emit('new', req.body)
            // socket.broadcast.emit('new', req.body)
        }
    }
  
  res.end()
}

export const config = {
  api: {
    bodyParser: true
  }
}

export default ioHandler