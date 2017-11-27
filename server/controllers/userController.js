import db from '../models'
import Sequelize from 'sequelize'

var UserController = {
  allUser: (req,res)=>{
    db.user.findAll({}).then( (result)=>{res.json(result)})
  },

  getUser:(req,res)=>{
    const paramUser=req.params.username
    
    db.user.findOne({
      where:{
        username:paramUser
      }
    })
    .then(result=>{
      res.status(200).json({
          id:result.id,
          username:result.username,
          nombres:result.nombres,
          apellidos:result.apellidos,
          email:result.email,
          hostname:result.hostname,
          connected:result.connected,
          estado:result.estado
        }
      )
    })
    .catch( error => {
      res.status(500).json({message:'Usuario no Existe'});
    });
  },

  register:function(req,res){
    var {username,password,nombres,apellidos,email,connected,estado} =req.body

    if(!username || !password || !nombres || !apellidos || !estado){
      res.status(404).json({ message: 'Data Invalida' })
    }else{
      db.user.create({
        username:username, 
        password:password,
        nombres:nombres,
        apellidos:apellidos,
        email:email,
        hostname:req.ip,
        connected:false,
        estado:estado
      })
      .then( result => {
        res.status(200).json({
          success: true,
          message:'Usuario Creado Correctamente!'
        })
      })
      .catch(Sequelize.ValidationError, error => {
        if(error.errors[0].type=='unique violation'){
          res.status(403).json({sucess:false,message: 'Usuario o Email! Ya se encuentra registrado!'})
        }else{
          res.status(400).json({success:false,message:error.errors[0].message});
        }
      })
      .catch( error => {
        res.status(500).json();
      });
    }  
 
  },

  update:function(req,res){
    var paramUser=req.params.username
    var {username,password,nombres,apellidos,email,connected,estado} =req.body
    
    if(!username || !password || !nombres || !apellidos || !estado){
      res.status(404).json({ message: 'Data Invalida' })
    }else{
      db.user.update({
        username:username, 
        password:password,
        nombres:nombres,
        apellidos:apellidos,
        email:email,
        hostname:req.ip,
        connected:false,
        estado:estado
      },{
        where:{username:req.params.username},
        fields: ['username','password','nombres','apellidos','email','estado'],
        hooks: true,
        individualHooks: true
      })
      .then( result => {
          if(result[0]==0){
            res.status(401).json({success:false,message:'Usuario no Existe'})
          }else{
            res.status(200).json({success:true,message:'Se Modifico Correctamente!'})
          }
      })
      .catch( error => res.status(403).json({ message: 'Error!' }))
    
    }//Fin Else

  },

  delete: function(req,res){
    const paramUser=req.params.username   //Si hay varios mostrara:    user1,user2,user3,
    //console.log("PRUBA:"+JSON.stringify(paramUser))
    var array = paramUser.split(",");
    var data=[]
    for(var i=0;i<array.length;i++){
      data.push(array[i])
    }
    data.forEach(elem => {
      db.user.findOne({
        where:{
          username:elem
        } 
      }) 
      .then(user=>{
        if(user!=null){
      
          db.user.destroy({
            where:{username:elem} 
          })
          .then(result => res.status(200).json({status:true,message:'Se Elimino correctamente el usuario:'+paramUser}))
          .catch(error => res.status(405).json({status:false,message:'Error! '+error} ))
        }
      })
    });
    
     
    /*
      db.user.findOne({
        where:{
          username:paramUser
        } 
      }) 
      .then(user=>{
        if(user!=null){
      
          db.user.destroy({
            where:{username:paramUser}
          })
          .then(result => res.status(200).json({status:true,message:'Se Elimino correctamente el usuario:'+paramUser}))
          .catch(error => res.status(405).json({status:false,message:'Error! '+error} ))
        }
      })
      */
  }

   
} 

module.exports = UserController;