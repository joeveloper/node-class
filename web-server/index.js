let http = require("http"); //http module
let url = require("url");

const server = http.createServer(function(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  // res.write(JSON.stringify({ message: "Hello World" }));
  const query = url.parse(req.url, true).query;
  const { name, age, gender } = query;
  res.write(`My name is ${name}, I am a ${gender} and I am ${age} years old`);
  res.end();
  // res.end();
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`The server has started on port ${PORT}`);
});
