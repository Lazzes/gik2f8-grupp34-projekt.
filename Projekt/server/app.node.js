//Import av http-modulen
const http = require('http');

//Skapa en http-server
const server = http.createServer((req, res) => {
  console.log(http.METHODS);

  const statusCode = 425;
  res.writeHead(statusCode);
  //Skicka ett meddelande som anger vilken metod och url som anropades
  res.end(`Du gjorde ett ${req.method}-anrop till ${req.url}`);
});
//Lyssna på port 5000
server.listen('5000', () => console.log('Server running on http://localhost:5000'));
