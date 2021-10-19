import { Server } from 'socket.io'
const readline = require('readline');

const ioHandler = async (req, res) => {
  var socket = res.socket.server.io
    if(req.method == "GET"){
      // emitData(req.rs, null);

      // res.writeHead(200, {
      //   'Cache-Control': 'no-cache',
      //   'Content-Type': 'text/event-stream',
      // });

        if (!socket) {
            console.log('*First use, starting socket.io')
            const io = new Server(res.socket.server)
            io.on('connection', socket => {
              socket.broadcast.emit('a user connected')
              socket.on('hello', msg => {
                  // console.log('msg:', msg)
                // socket.emit('hello', msg ?? " world!")
              })
              socket.on('new', msg =>{
                  console.log('broadcast')
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
          console.log('data:', data)
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
        console.log('imherecuy')
        
        let bunyan = require('bunyan');
        let log = bunyan.createLogger({
          name: "ServerLog",
          stream: req.ws
        });
        log.info(message)
        console.log('cuy2')

        if (!socket){
            console.log('here')
            const io = new Server(res.socket.server)
            io.on('connection', socket => {
                socket.broadcast.emit('a user connected')
                socket.broadcast.emit('new', message)
            });
        }else{
          console.log('message:', message)
          socket.local.emit('new', message)
          res.send(200)
        }
    }
  
  res.end()
}

async function readLine(rs, callback){
  const rl = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    console.log('line:', line)
    callback(line)
  }
}

function emitData(stream, socket, res){
  // console.log('stream:', stream)
  stream && readLine(stream, (x)=>{
    var obj = JSON.parse(x);
    console.log('x:', obj)
    socket.local.emit('new', obj.msg);
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