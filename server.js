const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const helpers = require('./util/helpers.js');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

app.use(require('./routes'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
