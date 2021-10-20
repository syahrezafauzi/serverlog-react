let fs = require('fs');
let path = require('path')
let moment = require('moment')

// server.js
const {
  createServer
} = require('http')
const {
  parse
} = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev
})
const handle = app.getRequestHandler()

// Log
let dir = `${process.cwd()}\\log\\`;
let dirRead = `${process.cwd()}\\log-read\\`;
!fs.existsSync(dir) && fs.mkdirSync(dir);
var filename = newFile('log');
var fullpath = path.join(dir, filename);
let stream = fs.createWriteStream(fullpath);
let net = require('net');
let _socket = null;

function initSocket(server) {
  if (!_socket) {
    const io = require('socket.io')(server);
    io.on('connection', client => {
      _socket = io;
      client.on('event', data => {
        /* … */ });
      client.on('disconnect', () => {
        /* … */ });
    });
  }
}

app.prepare().then(() => {
  var server = createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const {
      pathname,
      query
    } = parsedUrl
    var read;

    if (pathname === '/api') {
      read = fs.createReadStream(fullpath);
      req.socket = _socket;
    }

    req.ws = stream;
    req.rs = read;
    handle(req, res, parsedUrl)
  })

  initSocket(server);
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})

function newFile(prefix, format) {
  return `${prefix ? prefix : ""}${moment(new Date()).format("DMMyyyy_HHmmss")}.${format ? format : "json"}`;
}