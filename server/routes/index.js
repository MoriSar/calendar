const express = require('express')
const router = express.Router()
const api = require('../api')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    const data = {
      title: 'Calendar',
      user: req.session.user,
      event: 'Запуск/восстановление сессии -> страница календаря',
    }
    res.send(data)
  } else {
    const data = {
      title: 'Login',
      event: 'Запуск авторизации',
    }
    res.send(data)
  }
})

module.exports = router
