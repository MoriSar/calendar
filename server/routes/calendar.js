const express = require('express')
const router = express.Router()
const api = require('../api')

router.post('/get', function(req, res, next) {
  if (req.session.user) {
    api
      .getCalendar(req.session.user.id)
      .then(function(result) {
        res.send(JSON.stringify(result))
      })
      .catch(function(err) {
        res.send(err)
      })
  } else {
    res.send('Session was close')
  }
})
router.post('/update', function(req, res, next) {
  if (req.session.user) {
    const calendar = req.body.calendar
    api
      .updateCalendar(req.session.user.id, calendar)
      .then(function(result) {
        api.exportToJSONFile(result.calendar)
        res.send(JSON.stringify(result))
      })
      .catch(function(err) {
        console.log(err)
        res.send(JSON.stringify(err))
      })
  } else {
    res.send('Session was close')
  }
})
router.get('/export', function(req, res, next) {
  if (req.session.user) {
    api
      .getCalendar(req.session.user.id)
      .then(function(result) {
        api.exportToJSONFile(result.calendar, res)
      })
      .catch(function(err) {
        res.send(err)
      })
  } else {
    res.send('Session was close')
  }
})

module.exports = router
