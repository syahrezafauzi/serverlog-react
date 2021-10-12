export default (req, res)=>{
  let bunyan = require('bunyan');
  let log = bunyan.createLogger({
    name: "ServerLog",
    stream: stream
  });

  var method = req.method;
  var body = req.body;
  var stream = req.stream;

  if(method == "GET"){
    // stream.pipe(()=>{
    //   console.log("hello world")
    // });

    // var count = 0;

    res.writeHead(200, {
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
    });
    // req.pipe(stream).pipe(()=> {
    //   res.write('test');
    //   res.flush();
    // })

    // setInterval(()=>{
    //   res.write(`data: Processing${++count}...\n\n`);
    //   res.flush();
    // }, 1000)
  }else{
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