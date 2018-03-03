const assert = require('assert');
const axios = require('axios');
const models = require('../server/models');
const url = 'http://localhost:3000/contact';

const testContacts = [{
        id: 'Steve',
        phone: {
            mobile: '1234567890',
            home: '3216540987'
        },
        email: 'sj1234@email.com'
    },
    {
        id: 'Stacy',
        phone: {
            mobile: '0987654321'
        },
        email: 'sb0987@email.com'
    },
    {
        id: 'Raul',
        phone: {
            mobile: '5555555555',
            home: '1029384756'
        }
    }
];

testContacts.map(e => models.Contact(e))

describe('ContactsApp', function() {
    describe('Create', function() {
        it('POST should create 3 entries', function(done) {

            axios.all(testContacts.map(e => {
                axios({
                    method: 'post',
                    url: url + '/',
                    data: e
                })
            })).then(response => {
                assert.equal(response.length, 3);
            }).then(() => done(), done)
            .catch(err => {
                console.log(err);
            })
        })
    })

    describe('Query', function() {
        it('App should return full list of contacts', function(done) {
            axios({
                method: 'get',
                url: url + '?pageSize=5&page=1&query='
            }).then(response => {
                assert.equal(response.status, 200);
            }).then(() => done(), done)
            .catch(err => {
                console.log(err);
            })
        })

        it('App should return the named contact', function(done) {
            axios({
                method: 'get',
                url: url + '/Raul'
            }).then(response => {
                assert.equal(response.data.hits.hits[0]._source.id, 'Raul');
            }).then(() => done(), done)
            .catch(err => {
                console.log(err);
            })
        })
    })

    describe('Delete', function() {
        it('App should delete the named contact', function(done) {
            axios({
                method: 'delete',
                url: url + '/Steve'
            }).then(response => {
                assert.equal(response.status, 200);
            }).then(() => done(), done)
            .catch(err => {
                console.log(err);
            })
        })
    })

    describe('Update', function() {
        it('App should update the named contact', function(done) {
            axios({
                method: 'put',
                url: url + '/Stacy',
                data: {
                    id: 'Stacy',
                    phone: {
                        mobile: '0987654321',
                        home: '9998887777'
                    },
                    email: 'sb0987@email.com'
                }
            }).then(response => {
                assert.equal(response.status, 200);
            }).then(() => done(), done)
            .catch(err => {
                console.log(err);
            })
        })
    })


})