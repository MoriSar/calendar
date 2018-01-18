const express = require('express')
const router = express.Router()
const api = require('../api')

/* Авторизация пользователя */
router.post('/singup', function (req, res, next) {
    if (req.session.user) {
        console.log('Восстановление сессии -> страница авторизации')
        return res.redirect('/')
    }
    api
        .checkUser(req.body)
        .then(function (user) {
            if (user) {
                req.session.user = {id: user._id, name: user.name}
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
        .catch(function (error) {
            const data = {
                title: 'Login',
                event: 'Страница авторизации -> неверный логин',
            }
            res.send(data)
            return next(error)
        })
})
/* Регистрация пользователя */
router.post('/singin', function (req, res, next) {
    api
        .checkCollection(req.body)
        .then(function (result) {
            api.createCalendar(result)
                .then(function () {
                    const data = {
                        title: 'Calendar',
                        event: 'Создан новый пользователь',
                    }
                    res.status(200).send(data)
                });
        })
        .catch(function (err) {
            console.log(err);
            api.createUser(req.body)
                .then(function (result) {
                    api.createCalendar(result)
                        .then(function () {
                            const data = {
                                title: 'Calendar',
                                event: 'Создан новый пользователь',
                            }
                            res.status(200).send(data)
                        });
                })
                .catch(function (err) {
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
})
/* Разлогирование пользователя */
router.post('/singout', function (req, res, next) {
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
module.exports = router
