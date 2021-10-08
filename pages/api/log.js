export default (req, res)=>{
    res.writeHead(200, {
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
      });
      res.write('data: Processing...');
      /* https://github.com/expressjs/compression#server-sent-events
        Because of the nature of compression this module does not work out of the box with
        server-sent events. To compress content, a window of the output needs to be
        buffered up in order to get good compression. Typically when using server-sent
        events, there are certain block of data that need to reach the client.
    
        You can achieve this by calling res.flush() when you need the data written to
        actually make it to the client.
    */
   var count = 0;
      res.flush();
      // setTimeout(() => {
      //   res.write(`data: Processing${++count}...`);
      //   res.flush();
      // }, 1000);

    setInterval(()=>{
      res.write(`data: Processing${++count}...\n\n`);
        res.flush();
    }, 1000)
}

// export default (req, res)=>{
//     res.json({test: "ya"})
// }