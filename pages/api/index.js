const readline = require('readline');
const PUBLIC_BROADCAST = "public";

const ioHandler = async (req, res) => {
  var socket = req.socket;
  var read = req.rs;
  var write = req.ws;
  var isBroadcast = req.query && req.query.broadcast;

  if (req.method == "GET") {
    if (!socket && isBroadcast) broadcast(socket, PUBLIC_BROADCAST, read);

    // populate json file log each line into array
    var data = [];
    await readLine(read, (x) => {
      data = [...data, x]
    });
    res.status(200).json(data)

  } else {
    const log = initLog(write)
    const message = req.body;
    const data = JSON.stringify({
      time: new Date(),
      msg: message
    })

    log.info(message)
    broadcast(socket, PUBLIC_BROADCAST, data)
    res.send(200)
  }

  res.end()
}

function initLog(stream) {
  let bunyan = require('bunyan');
  const log = bunyan.createLogger({
    name: "ServerLog",
    stream: stream
  });

  return log;
}

async function readLine(rs, callback) {
  const rl = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    callback(line)
  }
}

// this feature will send broadcast to socket while reading stream each line
function broadcast(socket, type, data) {
  if (typeof (data) == 'stream') {
    data && readLine(data, (x) => {
      var obj = JSON.parse(x);
      socket && socket.local.emit(type, obj)
    });
  } else {
    socket && socket.local.emit(type, data)
  }

}

export const config = {
  api: {
    bodyParser: true
  }
}

export default ioHandler