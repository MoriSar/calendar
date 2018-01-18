const crypto = require('crypto')
const db = require('./bin/www')
const User = require('./models/Users.js')

exports.createUser = function (userData) {
    const user = new User({
        name: userData.name,
        password: hash(userData.password),
        calendar: [{
            title: '',
            start: 0,
            duration: 0
        }]
    })
    return user.save()
}

exports.getUser = function (id) {
    return User.findOne(id)
}

exports.checkUser = function (userData) {
    return User.findOne({name: userData.name}).then(function (doc) {
        if (doc.password === hash(userData.password)) {
            console.log('User password is ok')
            return Promise.resolve(doc)
        } else {
            return Promise.reject('Error wrong')
        }
    })
}
exports.getUserData = function (userData) {
    return User.findOne({name: userData})
        .then(function (doc) {
            return Promise.resolve(doc);
        })
        .catch(function (err) {
            console.log(err);
        })
}

function hash(text) {
    return crypto
        .createHash('sha1')
        .update(text)
        .digest('base64')
}
