import { Server } from 'socket.io'
const readline = require('readline');

const ioHandler = async (req, res) => {
  var socket = req.socket;
  if(socket == null) console.log('nullsocket')
    if(req.method == "GET"){
      // emitData(req.rs, null);

      // res.writeHead(200, {
      //   'Cache-Control': 'no-cache',
      //   'Content-Type': 'text/event-stream',
      // });

        if (!socket) {
            const io = new Server(res.socket.server)
            io.on('connection', socket => {
              socket.broadcast.emit('a user connected')
              socket.on('hello', msg => {
                  // console.log('msg:', msg)
                // socket.emit('hello', msg ?? " world!")
              })
              socket.on('new', msg =>{
                socket.broadcast.emit('new', msg)  
                socket.local.emit('new', msg)  
              })
              emitData(req.rs, io, res);
            })


            res.socket.server.io = io
          } else {
            emitData(req.rs, socket, res);
            console.log('socket.io already running')
          }

          var data = [];
          await readLine(req.rs, (x)=> {data =  [...data, x]});
          // console.log('data:', data)
          // res.json(data)
          res.status(200).json(data)
          // req.rs.pipe(res)
            // setInterval(()=>{
            //   console.log('interval')
            //   socket.local.emit('new', "b")
            //   res.flush();
            // }, 1000)
    }else{
        // console.log('socket:', socket)
        // console.log('req.body:', req.body)
        let message = req.body;
        
        let bunyan = require('bunyan');
        let log = bunyan.createLogger({
          name: "ServerLog",
          stream: req.ws
        });
        log.info(message)
        
        // socket.local.emit('new', message)
        socket.local.emit('new', JSON.stringify({time: new Date(), msg: message}))
        res.send(200)

        // if (!socket){
        //     console.log('here')
        //     const io = new Server(res.socket.server)
        //     io.on('connection', socket => {
        //         socket.broadcast.emit('a user connected')
        //         socket.broadcast.emit('new', message)
        //     });
        // }else{
        //   console.log('message:', message)
        //   socket.local.emit('new', message)
        //   res.send(200)
        // }
    }
  
  res.end()
}

async function readLine(rs, callback){
  const rl = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    callback(line)
  }
}

function emitData(stream, socket, res){
  // console.log('stream:', stream)
  stream && readLine(stream, (x)=>{
    var obj = JSON.parse(x);
    // fitur ini akan dikirim oleh socket sengaja dimatikan karena aplikasi fetch data dari ini on document ready
    if(false) socket.local.emit('new', obj.msg);
  });
  // stream && stream.on('data', (chunk)=>{
  //   setInterval(()=>{
  //     console.log('chunk:', chunk)
  //     socket.local.emit('new', chunk)   
  //     res.flush()
  //   }, 1000)
  // })
}

export const config = {
  api: {
    bodyParser: true
  }
}

export default ioHandler