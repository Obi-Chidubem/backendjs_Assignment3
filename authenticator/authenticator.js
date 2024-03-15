const { match } = require("assert");
const fs = require("fs");
const path = require("path");

const DatabasePath = path.join(__dirname, "users.json");

function retrieveUsers() {
  return new Promise((resolve, reject) => {
    // a la poubelle!
    fs.readFile(DatabasePath, "utf8", (err, users) => {
      //err first to catch code breakers
      if (err) {
        reject(err);
      }
      // console.log(users); HA! works.
      resolve(JSON.parse(users));
    });
  });
}

function authenticateUser(req, res) {
  //this will be filled in by teh req,res from the server side code
  return new Promise((resolve, reject) => {
    //Promises are cool (useful too), but i hate em.
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", async () => {
      const stringifiedChunk = Buffer.concat(body).toString();
      if (!stringifiedChunk) {
        reject("Please Input A Username and Password");
      }

      const parsedData = JSON.parse(stringifiedChunk);

      const users = await retrieveUsers();
      const matchingDetails = users.find(
        //this has to be the most useful method availale in js. along with sringify - of course.
        (user) =>
          user.username === parsedData.username &&
          user.password === parsedData.password
      );

      if (!matchingDetails) {
        reject("Invalid details");
      }

      resolve(matchingDetails);
    });
  });
}

module.exports = { authenticateUser }; //not a fucntion. don't forget.
