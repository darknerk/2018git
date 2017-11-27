import Sequelize from 'sequelize'

var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
} 

var VerificarDbController = {
  index: (req, res)=> {
    sequelize
    .authenticate() 
    .then(function(err) {
      res.status(500).json({status:true})
    })
    .catch(function (err) {
      res.status(200).json({status:false})
    });
  } 
};

module.exports = VerificarDbController