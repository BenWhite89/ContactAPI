module.exports = {
    Contact: Contact
}

function Contact(info) {
    return {
        id: info.id,
        email: info.email && info.email.length < 100 ? info.email : '',
        phone: {
            mobile: info.phone.mobile && info.phone.mobile.length < 11 ? info.phone.mobile : '',
            home: info.phone.home && info.phone.home.length < 11 ? info.phone.home : '',
            work: info.phone.work && info.phone.work.length < 11 ? info.phone.work : ''
        }
    }
}