
var express = require("express");
var historyFallback = require("connect-history-api-fallback");

const port = 8080;

//initialize the express app
var app=express();

//all get requests that don't specify a file extension will 
//return the index.html page instead
app.use(historyFallback({
}));

//serve static files from the public folder
app.use(express.static("./public"));

//start the server on the given port
app.listen(port);
