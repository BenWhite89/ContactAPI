module.exports = {
    Contact: Contact
}

function Contact(info) {
    return {
        id: (info.firstName.length < 20 ? info.firstName : '') + (info.lastName.length < 20 ? info.lastName : ''),
        firstName: info.firstName.length < 20 ? info.firstName : '',
        lastName: info.lastName.length < 20 ? info.lastName : '',
        email: info.email.length < 100 ? info.email : '',
        phone: {
            mobile: info.phone.mobile.length < 11 ? info.phone.mobile : '',
            home: info.phone.home.length < 11 ? info.phone.home : '',
            work: info.phone.work.length < 11 ? info.phone.work : ''
        }
    }
}