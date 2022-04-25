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
            attributes: {exclude: ['password']}
        }],
        order: [['createdAt', 'DESC']]
    })
        .then((products) => res.status(200).json(products))
        .catch(error => res.status(500).json({error : error}), db.Product.sync())
}

exports.getProduct = (req, res, next) => { // GET ONE PRODUCT
    db.Product.findOne({
        where: {productId: req.params.id},
        include: [{
            model: db.User,
            attributes: {exclude: ['password']}
        }]
    })
        .then((product) => {
            if(!product) {
                return res.status(401).json({error : 'Product not found'})
            }
            res.status(200).json(product)
        })
        .catch(error => res.status(500).json({error : error}), db.Product.sync())
}

exports.delProduct = (req, res, next) => {
    db.Product.findOne({
        where: {productId: req.params.id}
    })
        .then((product) => {
            if(!product) return res.status(401).json({error : 'Product not found'})
            if(product.autorId !== req.body.autorId) return res.status(401).json({error : 'You are not the autor'})
            db.Product.destroy({where: {productId: req.params.id}})
                .then(() => res.status(200).json({message: 'Product deleted'}))
                .catch(error => res.status(401).json({error: error}))
        })
}