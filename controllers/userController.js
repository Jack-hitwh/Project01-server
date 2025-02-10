const express = require('express')
const db = require("../models/db")
const bcrypt = require("bcrypt");
const constants = require("../config/constants");

exports.getUserByUsername = async (req, res) => {
    const username = req.query.username
    try {
        const [result] = await db.query(
            'SELECT * FROM user WHERE username = ?',
            [username],
        )
        if (!result||result.length<=0) {
            res.status(404).send('User Not Found')
        } else {
            res.status(200).send(result)
        }
    } catch (error) {
        console.error('Database error:', error)
        res.status(500).send('Internal Server Error')
    }
}