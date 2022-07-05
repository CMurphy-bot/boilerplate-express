let express = require('express');

require("dotenv").config();

let app = express();

express[console.log("Hello World")];

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

function simpleLogger(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}
function timeLogger(req, res, next) {
  req.time = new Date().toString();
  next();
}

app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word});
});

app.get("/name", (req, res) => {
  var firstname = req.query.first;
  var lastname = req.query.last;
  res.json({ name: `${firstname} ${lastname}`});
});

app.use("/public", express.static(__dirname +  "/public"));
app.use(simpleLogger);

app.get("/now", timeLogger, (req, res) => {
  res.json({ time: req.time});
});

app.get("/json", (req, res) => {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({ "message": message });
});

module.exports = app;
