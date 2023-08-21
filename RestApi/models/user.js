var Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.STRING,
        },
    });
};
