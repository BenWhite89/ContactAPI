const assert = require('assert');
const axios = require('axios');
const models = require('../server/models');
const url = 'http://localhost:3000/contact';

const testContacts = [{
        firstName: 'Steve',
        lastName: 'Johnson',
        phone: {
            mobile: '1234567890',
            home: '3216540987'
        },
        email: 'sj1234@email.com'
    },
    {
        firstName: 'Stacy',
        lastName: 'Black',
        phone: {
            mobile: '0987654321'
        },
        email: 'sb0987@email.com'
    },
    {
        firstName: 'Raul',
        lastName: 'Martinez',
        phone: {
            mobile: '5555555555',
            home: '1029384756'
        }
    }
];

testContacts.map(e => models.Contact(e))

describe('ContactsApp', function() {
    describe('Create', function() {
        it('POST should return 200 code', function() {

            axios.all(testContacts.map(e => {
                axios({
                    method: 'post',
                    url: url + '/',
                    data: e
                })
            }))
            .then(axios.spread((accts, perms) => {
                console.log(accts);
                console.log(perms);
            }))

            axios({
                method: 'post',
                url: url + '/',
                data: testContacts[0]
            })
            .then(response => {
                assert.equal(response, 200);
                done();
            })

        })
    })

    describe('Query', function() {
        it('App should return full list of contacts', function() {
            axios({
                method: 'get',
                url: url + '?pageSize=5&page=1&query='
            })
            .then(response => {
                assert.equal(response, 200);
                done();
            })
        })
    })
})