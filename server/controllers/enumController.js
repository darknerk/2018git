import db from '../models'

var EnumController = {
  enum: function(req,res){

    var paramsModel=req.params.model
    var userEstadoEnum=db.user.rawAttributes.estado.values      //estado:['active','inactivo']


    let arrayToJsonEstado = Object.assign({}, userEstadoEnum);  //estado: {"0":"active","1":"inactivo"}
    /*
    if(paramsModel=='user'){
      res.status(200).json(
        {
          estado:userEstadoEnum
        }
      )
    }
    else{
      res.status(500).json({message:'Modelo no Encontrado!'})
    }
    */
    
    res.status(200).json(
      { 
        user:{
          estado:userEstadoEnum
        }
      }
    )
   
  }    
}

module.exports=EnumController