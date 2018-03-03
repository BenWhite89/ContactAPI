const express = require('express');
const procedures = require('../procedures/contacts.proc')

let router = express.Router();

router.route('/')
    .get((req, res) => {

    })


export default router;