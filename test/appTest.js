const assert = require('assert');
const axios = require('axios');
const url = 'http://localhost:3000/contact/';

const testContacts = [{
        firstName: 'Steve',
        lastName: 'Johnson',
        phones: {
            mobile: '1234567890',
            home: '3216540987'
        },
        email: 'sj1234@email.com'
    },
    {
        firstName: 'Stacy',
        lastName: 'Black',
        phones: {
            mobile: '0987654321'
        },
        email: 'sb0987@email.com'
    },
    {
        firstName: 'Raul',
        lastName: 'Martinez',
        phones: {
            mobile: '5555555555',
            home: '1029384756'
        }
    }
];

describe('ContactsApp', function() {
    describe('Create', function() {
        it('POST should return 200', function() {
            axios({
                method: 'post',
                url: url,
                data: testContacts[0]
            })
            .then(response => {
                assert.equal(response, 200);
                done();
            })
            .catch(err => {
                console.log(err);
            })

        })
    })

    describe('Query', function() {
        it('App should return full list of contacts', function() {

        })
    })
})