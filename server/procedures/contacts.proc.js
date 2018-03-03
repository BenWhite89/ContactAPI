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

function getContactByName(name) {
    return new Promise((fulfill, reject) => {
        esclient.search({
            index: 'contacts',
            type: 'contact',
            body: {
                query: {
                    match: {
                        "id": name
                    }
                }
            }
        }).then(res => {
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
        }).then(res => {
            fulfill(res);
        }, err => {
            reject(err);
        })
    })
}

function updateContact(id, contact) {
    return new Promise((fulfill, reject) => {
        getContactByName(id)
        .then(response => {
            esclient.index({
                index: 'contacts',
                type: 'contact',
                id: response.hits.hits[0]._id,
                body: contact
            }).then(res => {
                fulfill(res);
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}

function deleteContact(id) {
    return new Promise((fulfill, reject) => {
        getContactByName(id)
        .then(response => {
            esclient.delete({
                index: 'contacts',
                type: 'contact',
                id: response.hits.hits[0]._id
            }).then(res => {
                fulfill(res);
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}

module.exports = {
    createContact: createContact,
    getContactByName: getContactByName,
    getContacts: getContacts,
    updateContact: updateContact,
    deleteContact: deleteContact
}