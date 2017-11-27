import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-node';
import JWT_TOKEN from '../config/auth'
import db from '../models'
import Sequelize from 'sequelize'

var AuthController = {};

AuthController.authenticate = (req,res)=>{
 if (!req.body.username || !req.body.password) {
    res.status(404).json({ message: 'Usuario y Password son Necesario!' });
  } else{
    var username = req.body.username
    var password = req.body.password
    
    db.user.findOne({where:{username:username}})
    .then(user=>{
      if(!user){
        res.status(401).json({
          message:'Autenticacion Incorrecta!',
          success:false
        })
      }else{
        comparePasswords(password,user.password,function(error, isMatch){
          if(isMatch && !error){

            var token = jwt.sign(
              {  
                id:user.id,
                username:user.username
              },
              JWT_TOKEN,
              { expiresIn: '10m' }
            );

            res.status(201).json({
              message:'Autenticacion correcta!',
              success: true,
              token: 'JWT ' + token, 
            })
          }else{
            res.status(401).json({ 
              message:'Autenticacion Incorrecta!',
              success:false
            });
          }
        })
      }

    })
    .catch(error=> res.status(500).json({ message: error } ))     
  }
}

// Comapara los Password
function comparePasswords(password, hash, callback)
{
    bcrypt.compare(password, hash, function(error, isMatch) {
        if(error)
        {
            return callback(error);
        }

        return callback(null, isMatch);
    });
}


module.exports = AuthController;