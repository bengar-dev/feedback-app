const express = require('express')
const app = express()
const {Sequelize, DataTypes} = require('sequelize')
const mysql = require('mysql')

dotenv = require('dotenv').config()


// ROUTES


// CONNECTIONS

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_MDP, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

const connect = async() => {
    try {
        sequelize.authenticate()
        console.log('Connted to MySQL Database')
    } catch (error) {
        console.error('Error : Can not connect to the Database MySQL :', error)
    }
}

connect()


// DECLARATIONS CORS

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})

// CHEMINS API


module.exports = app;