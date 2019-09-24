const http = require('http');
const fs = require('fs')
const url = require('url')
const port = 3000;

const server = http.createServer(function (req, res) {
    const q = url.parse(req.url, true).query;
  if (req.url === '/index' || req.url === '/'){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<h1>Server works</h1><p>available url:<br> /hello - get hello world<br> /file - get local file<br> /?name=name - get text with your name</p>')
      return res.end()
  } else if(req.url === '/hello'){
      res.writeHead(200, {'Contente-Type': 'text/html'});
      res.write('<h1>Hello world</h1>')
      return res.end()
  } else if(q.name !== undefined && q.name !== ''){
      res.writeHead(200, {'Contente-Type': 'text/html'});
      const txt =`Have a nice day mr. ${q.name}` 
      res.write(`<h1>${txt}</h1>`)
      return res.end()
  } else if(req.url === '/file'){
      fs.readFile('homework3.txt', function(err, data){
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-type': 'text/plain'})
      res.write('local file:  ')
      res.write(data);
      return res.end();
    })    
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'}); 
    res.write("<h2>not found</h2>")
    return res.end()
  }
})

server.listen(port, function(){
    console.log(`server is on port ${3000}`)
});