const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sanitize = require('sanitizer')
const { Sequelize } = require('sequelize')
const fs = require('fs')

const db = require('../models')

exports.login = (req, res, next) => { // LOGIN
    db.User.findOne({where: {email: req.body.email}})
        .then((user) => {
            if(!user) {
                return res.status(401).json({error: 'User not found'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if(!valid) {
                        return res.status(401).json({error: 'Password incorrect'})
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            {userId: user.id},
                            'EZJIAOEJZHIOEJZAIOEJZAIOEZAJUIEOZAJUEIOZA',
                            {expiresIn: '24h'}
                        )
                    })
                })
                .catch(error => res.status(500).json({error: error}))
        })
        .catch(error => res.status(500).json({error: error}))
}

exports.register = (req, res, next) => { // REGISTER

    const validEmail = (email) => { // FONCTION REGEX VERIFICATION FORMAT EMAIL
        return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    }

    const validPass = (password) => { // FONCTION REGEX VERIFICATION FORMAT PASSWORD
        return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
    }

    if(!validEmail(req.body.email)) {
        return res.status(401).json({error: 'Email format incorrect'})
    }
    if(!validPass(req.body.password)) {
        return res.status(401).json({error: 'Password format incorrect'})
    }

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new db.User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(200).json({message : 'User registered'}))
                .catch(error => res.status(401).json({error : error}))
        })
        .catch(error => res.status(500).json({error: error}))   
}

exports.delUser = (req, res, next) => { // DELETE ONE USER
    db.User.findOne({where: {id: req.params.id}})
        .then((user) => {
            if(!user) {
                return res.status(401).json({error: 'User not found'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if(!valid) {
                        return res.status(401).json({error: 'Password incorrect'})
                    }
                    db.User.destroy({where: {id: req.params.id}})
                        .then(() => res.status(200).json({message: 'User deleted'}))
                        .catch(error => res.status(500).json({error: error}))
                })
                .catch(error => res.status(500).json({error: 'Request invalid : Missing password'}))
        })
        .catch(error => res.status(500).json({error: error}))
}

exports.getUsers = (req, res, next) => { // GET ALL USERS
    db.User.findAll()
        .then((users) => res.status(200).json(users))
        .catch(error => res.status(401).json(error), db.User.sync())
}

exports.getUser = (req, res, next) => { // GET ONE USER
    db.User.findOne({where: {id: req.params.id}})
        .then((user) => {
            if(!user) {
                return res.status(401).json({error: 'User not found'})
            } 
            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({error : error}))
}
