require('dotenv').config(); // Configure environment varaiable value of current node instance env object

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('config');

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV; // Development not but on run can be set to Production based on production environment

app.use(bodyParser.json());    // Using middleware bodyParser to populate body with data
app.use(bodyParser.urlencoded({extended: true}))

const routes = require('./routes/index.routes');
app.use('/app/v1',routes(router));

app.listen( config.port, ()=>{
  console.log(`Listening on port ${config.port}`)
})

module.exports = app;
