// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//code above was provided for the challenge

//code below is what was needed to pass the challenge
app.get("/api/:date?", (req,res) => {
  
  let date;

  if (!req.params.date) {
    // if no date is provided to the API - Return the current date.
    date = new Date();
  } else if (!isNaN(req.params.date)) {
    // Handle case for if the date provided is in unix time
    date = new Date(parseInt(req.params.date));
  } else {
    // otherwise, set date to the date provided.
    date = new Date(req.params.date);
  }


  if (isNaN(date.getTime())) {
    // if provided date is invalid, return a JSON object with error: Invalid date
    res.json({error: "Invalid Date" });
  } else {
    // otherwise, return a JSON object with unix and utc.
    res.json({ unix: date.getTime(), utc: date.toUTCString()})
  }
  });
