const express = require('express');
const contact = require('./controllers/contacts.ctrl')

let app = express();

app.use('/contact', contact);

app.listen(3000);