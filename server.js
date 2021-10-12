
let fs = require('fs');
let path = require('path')
let moment = require('moment')

// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Log
let dir = `${process.cwd()}\\log\\`;
let dirRead = `${process.cwd()}\\log-read\\`
!fs.existsSync(dir) && fs.mkdirSync(dir);
var filename = newFile('log');
var fullpath = path.join(dir, filename);
let stream = fs.createWriteStream(fullpath);

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/api/log') {
      var stream = fs.createReadStream(fullpath);
      // stream.pipe(()=> console.log("pipe"))
      req.stream = stream;
    }

    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('iminserver')
    console.log('> Ready on http://localhost:3000')
  })
})

function newFile(prefix, format){
  return `${prefix ? prefix : ""}${moment(new Date()).format("DMMyyyy_HHmmss")}.${format ? format : "json"}`;
}