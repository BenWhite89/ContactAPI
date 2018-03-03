const elasticsearch = require('elasticsearch');

var esclient = new elasticsearch.Client({
    host: 'localhost:9200'
});

function createContact(contact) {
    return new Promise((fulfill, reject) => {
        esclient.indices.create({
            index: 'contacts',
        }, (err, res, status) => {
            esclient.index({
                index: 'contacts',
                type: 'contact',
                body: contact
            }, (err, res, status) => {
                 err ? reject(err) : fulfill(res);
            })
        })
    })
}

function getContactById(name) {
    name = name.split("_");
    return new Promise((fulfill, reject) => {
        esclient.search({
            index: 'contacts',
            type: 'contact',
            body: {
                query: {
                    match: {
                        firstName: name[0] ? name[0] : "",
                        lastName: name[1] ? name[1] : ""
                    }
                }
            }
        })
        .then(res => {
            fulfill(res);
        }, err => {
            reject(err);
        })
    })
}

function getContacts(query) {
    return new Promise((fulfill, reject) => {
        esclient.search({
            index: 'contacts',
            type: 'contact',
            body: {
                query: {
                    match_all: {}
                }
            }
        })
        .then(res => {
            fulfill(res);
        }, err => {
            reject(err);
        })
    })
}

module.exports = {
    createContact: createContact,
    getContactById: getContactById,
    getContacts: getContacts
}