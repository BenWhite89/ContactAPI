const express = require('express');
const bodyParser = require('body-parser');
const contact = require('./controllers/contacts.ctrl')

let app = express();

app.use(bodyParser.json());

app.use('/contact', contact);

app.listen(3000, function() {
  console.log('listening...');
})