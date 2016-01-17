'use strict';

require('console-stamp')(console, '[HH:MM:ss.l]');
require('datejs');

let express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

let path = require("path");
let Generator = require('./generator');

// Express server configuration
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Setup public folder on /
app.use("/", express.static("./public/"));
app.use("/pdf/", express.static("./public/pdf/"));

// Routes
app.post("/generatePDF", (req, res) => {
  let link = Generator.generate(path.join(__dirname, "public/"),req.body);
  res.redirect(link);
})

app.listen(9900, () => {
  console.log("> Server is ready !");
});
