const http = require("http");
const { authenticator } = require("./authenticator/authenticator");

PORT = 8000;
hostname = "localhost";

const server = http.createServer(() => {
  console.log(authenticator);
});

server.listen(PORT, hostname, () => {
  console.log(`Server Running on port ${PORT}`);
});
