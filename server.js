const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');


const items = require('./routes/api/items');

const app = express();

//bodyParser middleware
app.use(bodyParser.json());

//Db config
const db = require('./config/keys').mongoURI;


// connect to mongos

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected....'))
    .catch((err) => console.log(err));



// use routes

app.use('/api/items', items)

// serve static assets if in production
if(process.eventNames.NODE_ENV === 'production') {
    app.use (express.static('client/build'));

    app.get('*',(req, res) => {
        res.sendFile(path.resolve(__dirname, 'client' , 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started ${port}`));