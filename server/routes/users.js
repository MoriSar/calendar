const express = require('express')
const router = express.Router()
const api = require('../api')

/* Авторизация пользователя */
router.post('/singup', function(req, res, next) {
  if (req.session.user) {
    console.log('Восстановление сессии -> страница авторизации')
    return res.redirect('/')
  }
  api
    .checkUser(req.body)
    .then(function(user) {
      if (user) {
        req.session.user = { id: user._id, name: user.name }
        const data = {
          title: 'Calendar',
          event: 'Вход выполнен',
        }
        res.redirect('/').send(data)
      } else {
        const data = {
          title: 'Login',
          event: 'Неудачный вход',
        }
        res.send(data)
      }
    })
    .catch(function(error) {
      console.log('неверный логин')
      const data = {
        title: 'Login',
        event: 'Страница авторизации -> неверный логин',
      }
      res.send(data)
      return next(error)
    })
})
/* Регистрация пользователя */
router.post('/singin', function(req, res, next) {
  api
    .createUser(req.body)
    .then(function(result) {
      const data = {
        title: 'Calendar',
        event: 'Создан новый пользователь',
      }
      res.status(200).send(data)
    })
    .catch(function(err) {
        if (err.toJSON().code === 11000) {
            const data = {
                title: 'Login',
                event: 'Такой пользователь уже есть',
                error: err,
            }
            res.status(500).send(data)
        } else {
        res.send(err)
      }
    })
})
/* Разлогирование пользователя */
router.post('/singout', function(req, res, next) {
  if (req.session.user) {
    delete req.session.user
    res.redirect('/')
  } else {
    const data = {
      title: 'Login',
      event: 'Некого разлогированивать',
    }
    res.status(500).send(data)
  }
})
/* Получить информацию юзера */
router.post('/getdata', function (req, res, next) {
    api.getUserData(req.body.name)
        .then(function (result) {
            console.log(result);
            res.send({
                    userName: result.name,
                    calendar: result.calendar
                }
            );
        })
        .catch(function (err) {
            res.send(err);
        });
})

module.exports = router
