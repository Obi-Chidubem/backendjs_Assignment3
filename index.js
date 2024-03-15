const http = require("http");
const { authenticateUser } = require("./authenticator/authenticator"); //just use the damn function name
const users = require("./authenticator/users.json");

PORT = 8000;
hostname = "localhost";

const server = http.createServer((req, res) => {
  if (req.url == "/" && req.method == "GET") {
    authenticateUser(req, res)
      .then(() => {
        console.log("User Confirmed");
        res.end(JSON.stringify(users)); //a little bit of flair for your viewing pleasure.
      })
      .catch((err) => {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            message: err,
          })
        );
      });
  }
});

server.listen(PORT, hostname, () => {
  console.log(`Server Running on port ${PORT}`);
});
