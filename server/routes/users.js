const express = require('express')
const router = express.Router()
const api = require('../api')

/* Авторизация пользователя */
router.post('/signin', function (req, res, next) {
    if (req.session.user && !req.body) {
        api
            .getUserData(req.session.user.name)
            .then(function (result) {
                api.getCalendar(result._id).then(function (_result) {
                    const data = {
                        title: 'Calendar',
                        userName: result.name,
                        calendar: _result.calendar,
                        event: 'Запуск/восстановление сессии -> страница календаря',
                        status: '',
                    }
                    res.send(JSON.stringify(data))
                })
            })
            .catch(function (err) {
                res.send(JSON.stringify(err))
            })
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
                    status: '',
                }
                res.send(JSON.stringify(data))
            } else {
                const data = {
                    title: 'Login',
                    event: 'Неудачный вход',
                    status: 'Wrong login/password',
                }
                res.send(JSON.stringify(data))
            }
        })
        .catch(function (error) {
            const data = {
                title: 'Login',
                event: 'Страница авторизации -> неверный логин',
                status: 'Wrong login/password',
            }
            res.send(JSON.stringify(data))
            return next(error)
        })
})
/* Регистрация пользователя */
router.post('/signup', function (req, res, next) {
    if (!req.body.name || !req.body.password) {
        const data = {
            title: 'Login',
            event: 'Не заполнены поля',
            status: 'Fill in all the fields',
        }
        res.status(500).send(data)
    } else {
        api
            .checkCollection(req.body)
            .then(function (result) {
                api.createCalendar(result).then(function () {
                    const data = {
                        title: 'Calendar',
                        event: 'Создан новый пользователь',
                        status: '',
                    }
                    res.status(200).send(JSON.stringify(data))
                }).catch((err) => {
                    console.log('1111111' + err);
                })
            })
            .catch(function (err) {
                api
                    .createUser(req.body)
                    .then(function (result) {
                        api.createCalendar(result).then(function () {
                            const data = {
                                title: 'Calendar',
                                event: 'Создан новый пользователь',
                                status: '',
                                id: Date.now()
                            }
                            res.status(200).send(JSON.stringify(data))
                        })
                    })
                    .catch(function (err) {
                        console.log(err);
                        if (err.toJSON().code === 11000) {
                            const data = {
                                title: 'Login',
                                event: 'Такой пользователь уже есть',
                                error: err,
                                status: 'User is exist',
                            }
                            res.status(500).send(JSON.stringify(data))
                        } else {
                            res.send(JSON.stringify(err))
                        }
                    })
            })
    }
})
/* Разлогирование пользователя */
router.post('/signout', function (req, res, next) {
    if (req.session.user) {
        delete req.session.user
        res.redirect('/')
    } else {
        const data = {
            title: 'Login',
            event: 'Некого разлогированивать',
            status: '',
        }
        res.status(500).send(JSON.stringify(data))
    }
})
module.exports = router
