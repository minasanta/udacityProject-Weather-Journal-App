// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// GET route that returns the projectDat
app.get('/all', (req, res) => { res.send(projectData) });

// POST route that adds incoming data to projectData
app.post('/add', (req, res) => {
    projectData["temperature"] = req.body.temp;
    projectData["date"] = req.body.date;
    projectData["userResponse"] = req.body.feelings;
    console.log(projectData); // to see the data in the TERMINAL
    res.send(projectData);
});

// Setup Server
const port = 8000;
const server = app.listen(port, () => { console.log(`The local server at localhost:${port}`); });
