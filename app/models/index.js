const dbConfig = require('../config/db.config.js');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
});

const db = {
    Sequelize,
    sequelize,
    users: require('./user.model')(sequelize, Sequelize),
    bootcamps: require('./bootcamp.model')(sequelize, Sequelize)
};

module.exports = db;