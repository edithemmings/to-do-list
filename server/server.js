const express = require('express');
const bodyParser = require('body-parser')

// variables
const app = express();
const PORT = 5000;

//imports
let tasksRouter = require('./routes/tasks_router')

//use
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/tasks', tasksRouter);

//port announcement
app.listen(PORT, () => {
    console.log('listening on port', PORT)
});