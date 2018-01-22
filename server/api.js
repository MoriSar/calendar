const crypto = require('crypto')
const db = require('./bin/www')
const User = require('./models/Users.js')
const Calendar = require('./models/Calendar.js')
const fs = require('fs')
const jsonfile = require('jsonfile')
let path = require('path')

exports.checkCollection = function(userData) {
  const user = {
    name: userData.name,
    password: hash(userData.password),
  }
  return new User(user).save()
}

exports.createUser = function(userData) {
  const user = {
    name: userData.name,
    password: hash(userData.password),
  }
  return User.update(user)
}

exports.getUser = function(id) {
  return User.findOne(id)
}

exports.checkUser = function(userData) {
  return User.findOne({ name: userData.name }).then(function(doc) {
    if (doc.password === hash(userData.password)) {
      console.log('User password is ok')
      return Promise.resolve(doc)
    } else {
      return Promise.reject('Error wrong')
    }
  })
}
exports.getUserData = function(userData) {
  return User.findOne({ name: userData })
    .then(function(doc) {
      return Promise.resolve(doc)
    })
    .catch(function(err) {
      console.log(err)
    })
}
exports.createCalendar = function(userData) {
  const calendar = {
    userId: userData._id,
    calendar: [
      {
        start: 0,
        duration: 0,
        title: '',
        id: 0,
      },
    ],
  }
  return new Calendar(calendar).save()
}
exports.getCalendar = function(userData) {
  return Calendar.findOne({ userId: userData })
    .then(function(doc) {
      return Promise.resolve(doc)
    })
    .catch(function(err) {
      console.log(err)
    })
}
exports.updateCalendar = function(userData, calendarData) {
  return Calendar.findOneAndUpdate({ userId: userData }, { calendar: calendarData })
    .then(function(taruri) {
      return Promise.resolve(taruri)
    })
    .catch(function(err) {
      console.log(err)
    })
}
exports.exportToJSONFile = function(data, response) {
  const calendar = data.map((item, key) => {
    return {
      start: item.start,
      duration: item.duration,
      title: item.title,
    }
  })
  /*jsonfile.writeFile(file, calendar, function (err) {
        console.error(err)
    })*/
  /*response.writeHead(200, {
        "Content-Type": "application/json",
        "Content-Disposition": "attachment; filename=" + file
    });
    fs.createReadStream(file).pipe(response);*/
  let filename = 'calendar.json'
  let absPath = path.join(__dirname, '', filename)
  let relPath = path.join('./', filename) // path relative to server root

  fs.writeFile(relPath, JSON.stringify(calendar), err => {
    if (err) {
      console.log(err)
    }
    response.download(absPath, err => {
      if (err) {
        console.log(err)
      }
      /*fs.unlink(relPath, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('FILE [' + filename + '] REMOVED!');
            });*/
    })
  })
}

function hash(text) {
  return crypto
    .createHash('sha1')
    .update(text)
    .digest('base64')
}
