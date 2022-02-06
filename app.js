const express = require("express");
const morgan = require('morgan');
const mongoose = require("mongoose");
const {getPollController, postPollController} = require('./controller/pollController');

const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
// app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/create', getPollController);
app.post('/create', postPollController);

app.get('/', (req, res) => {
    res.render('home');
});

const PORT = 4000;

mongoose.connect('mongodb://localhost/pole_cc', {useNewUrlParser: true, useUnifiedTopology: true, family: 4})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running in port ${PORT}`);
        });
    })
    .catch((err) => console.log('Failed to connect database', err))
