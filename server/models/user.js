import bcrypt from 'bcrypt-node';

module.exports=function(sequelize,DataTypes){
  var user = sequelize.define('user', {
    
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    username:{
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      
      }
    },
    nombres:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      }
    },
    apellidos:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      }

    },
    email:{
      type:DataTypes.STRING,
      unique: true,
      validate: { 
        isEmail: { args: true, msg: 'Validacion Email Incorrecto!' } 
      }
    },
    hostname:{
       type:DataTypes.STRING,
       validate:{
        isIP: { args: true, msg: 'Ip Invalido'}
       }
    },
    connected:{
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['activo', 'inactivo'], 
      defaultValue: 'activo',
      validate: {
        notEmpty: true
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }

  })

  user.beforeCreate((user)=>{
    return hashPassword(user)
  })
  user.beforeUpdate((user)=>{
    return hashPassword(user)
  })

  function hashPassword(user){
    const salt = bcrypt.genSaltSync(10)
    user.set('password',bcrypt.hashSync(user.password,salt))
  }

  return user
}