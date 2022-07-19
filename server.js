// Setup empty JS object to act as endpoint for all routes
projectData = {
  thing: "some things here",
  name: 'Eddie',
  age: 37,
};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

app.get('/', (req, res) => {
  console.log('console log', projectData);
  res.status(200).send(projectData);
});

app.get('/all', (req, res) => {
  console.log('all route');
});

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = process.env.PORT || 4000;
app.listen(port, listening);

function listening() {
  console.log(`runnin on localhost: ${port}`);
};
