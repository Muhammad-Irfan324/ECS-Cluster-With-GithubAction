const http = require('http');
const secretValue = process.env.SECRET_VALUE || 'No Secret Provided';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello World ${secretValue}\n`);
});

const port = process.env.PORT || 80;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
