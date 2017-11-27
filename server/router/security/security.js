var ExpressBrute = require('express-brute')
import SequelizeStore from 'express-brute-sequelize-js'
import Sequelize from 'sequelize'

import express from 'express'
var router = express.Router();


var sequelize = new Sequelize('oti_2018', 'root', '', {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false
});

// Need a sequelize connection
const store = new SequelizeStore(sequelize, 'brute_store', {})

// Needs to be run once
store.migrate();

const bruteforce = new ExpressBrute(store, {});

router.get('/',bruteforce.prevent,(req,res)=>{
  res.send("prueba")
}) 

router.get('/hola',(req,res)=>{
  res.send("hola")
}) 

module.exports = router