const express = require('express')
const sanitize = require('sanitizer')
const { Sequelize } = require('sequelize')
const fs = require('fs')

const db = require('../models')

exports.addProduct = (req, res, next) => {
    const productObject = {
        ...req.body
    }
    const product = new db.Product({
        ...productObject
    })
    product.save()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(401).json({error : error}))
}        

exports.getProducts = (req, res, next) => { // GET ALL PRODUCTS
    db.Product.findAll({
        include: [{
            model: db.User,
            attributes: {exclue: ['password']}
        }],
        order: [['createdAt', 'DESC']]
    })
        .then((products) => res.status(200).json(products))
        .catch(error => res.status(500).json({error : error}), db.Product.sync())
}