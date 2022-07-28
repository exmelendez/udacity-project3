// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

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

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

/* Currently not being used */
app.get('/', (req, res) => {
  res.status(200).send(projectData);
});

app.get('/data', (req, res) => {
  res.send(projectData);
});

app.post('/addEntry', addEntry);

function addEntry (req, res){
  const d = new Date();
  const newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()} | ${d.toLocaleTimeString()}`;
  
  projectData = req.body;
  projectData.entryDT = newDate;
  res.send(projectData);
}
