const express = require('express');
const procedures = require('../procedures/contacts.proc')

let router = express.Router();

router.route('')
    .get((req, res) => {
        procedures.getContacts(req.query)
        .then(contacts => {
            console.log(contacts.hits.hits);
            res.status(200).send(contacts.hits.hits)
        }, err => {
            console.log(err);
            res.sendStatus(500);
        })
    })

router.route('/')
    .post((req, res) => {
        procedures.createContact(req.body)
        .then(contact => {
            res.status(200).send(contact);
        }, err => {
            console.log(err);
            res.sendStatus(500);
        })
    })

router.route('/:id')
    .get((req, res) => {
        procedures.getContactById(req.params.id)
        .then(contact => {
            res.status(200).send(contact);
        }, err => {
            console.log(err);
            res.sendStatus(500);
        })
    })

    // remember to add logic to return error if no contact is found
    .put((req, res) => {
        procedures.updateContact(req.params.id, req.body.contact)
        .then(contact => {
            res.status(200).send(contact);
        }, err => {
            console.log(err);
            res.sendStatus(500);
        })
    })

    // remember to add logic to return error if no contact is found
    .delete((req, res) => {
        procedures.deleteContact(req.params.id)
        .then(success => {
            res.status(200).send(success)
        }, err => {
            console.log(err);
            res.sendStatus(500);
        })
    })


module.exports = router;