const path = require('path');
const db = require('../../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const usersAPIController = {
    list: (req, res) => {
        db.User.findAll()
            .then(users => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: 'api/users'
                    },
                    data: users
                }
                res.json(respuesta);
            })
    },
    count:(req, res) => {
        db.User.findAll()
            .then(users => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: 'api/users/count'
                    },
                    data: users.length
                }
                res.json(respuesta);
            })
    },
}

module.exports = usersAPIController;