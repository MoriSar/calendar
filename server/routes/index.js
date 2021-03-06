const express = require('express')
const router = express.Router()
const api = require('../api')

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.user) {
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
    } else {
        const data = {
            title: 'Login',
            event: 'Запуск авторизации',
            status: '',
        }
        res.send(data)
    }
})

module.exports = router
