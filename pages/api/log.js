export default (req, res)=>{
  let fs = require('fs');
  let through = require('through')

  var method = req.method;
  var body = req.body;

  if(method == "GET"){
    res.writeHead(200, {
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
    });
    var read = req.rs;
    var write = req.ws;
    // stream = fs.createReadStream(stream.path);
    // console.log('GET path:', stream.path)
    // stream.pipe(()=>{
    //   console.log("hello world")
    // });

    read
        // .pipe(through((buf)=> {
        //   this.emit('data', buf.toString())
        // }))
        .pipe(res)

    var count = 0;
    read.on('data', (chunk)=>{
      console.log(`haha: ${count++}`)
      res.write(`coba: ${count}`)
      res.flush();
    })

    // res.writeHead(200, {
    //   'Cache-Control': 'no-cache',
    //   'Content-Type': 'text/event-stream',
    // });

    // console.log('stream:', stream.path)
    // stream.on('end', (chunk)=>{
    //   console.log('imhere')
    //   res.write(`test: ${++count}`);
    //   res.flush();
    // })

    // req.pipe(stream).pipe(()=> {
    //   res.write('test');
    //   res.flush();
    // })

    // setInterval(()=>{
    //   res.write(`data: Processing${++count}...\n\n`);
    //   res.flush();
    // }, 1000)
  }else{
    let bunyan = require('bunyan');
    let log = bunyan.createLogger({
      name: "ServerLog",
      stream: req.ws
    });
    log.info("hello world")
    res.send(200)
  } 
}

function isEmpty(obj) {
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }
  return JSON.stringify(obj) === JSON.stringify({});
}