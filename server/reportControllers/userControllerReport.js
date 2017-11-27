import request from 'request'
import db from '../models'

var UserReport = {};

UserReport.Index=(req,res) =>{
   //URI: PDF: http://localhost:9000/api/v2/jsReport/user?shortid=SyIH7rdnW
  //URI: EXCEL: http://localhost:9000/api/v2/jsReport/user?shortid=H17Y3w_nZ
  var shortid = req.query.shortid  
  var options,data

  //CONSULTAR TODOS LOS DATOS DE LA TABLA USER
  db.user.findAll({},{row:true}).then( (result)=>{
    var datas=[]
    //Recorrer todos los datos
    result.map(results=>{
      var datos =results.dataValues
      
      //Agregar datos en Array
      datas.push(datos)

      data={
        template:{shortid:shortid},
        data:{
          "users":datas
        },
        options:{
          preview:true
        }
      }
      
      options={
        uri:'http://localhost:5488/api/report',
        method:'POST',
        json:data
      }
    })  
    //MOSTRAR
    request(options).pipe(res);
  })


};

UserReport.CargaRender= (req,res)=>{
  var shortid = req.query.shortid

  var datas=[]
  
  for(var i=0;i<15000;i++){
    datas.push({
      username:"admin "+i,
      password:"password "+i,
      nombres:"walter "+i,
      apellidos:"santin "+i,
      email:"email"+i+"@email.com",
      hostname:"192.168.1."+i,
      status:'active'

    })
  }

  var data={
    template:{shortid:shortid},
    data:{
      "users":datas
    },
     options:{
      preview:true,
      timeout: 120000  //acepta hasta 18 000 Datos 
    }
  }
       
  var options={
      uri:'http://localhost:5488/api/report',
      method:'POST',
      json:data,
      //timeout: 120000,
  }
  //MOSTRAR
  request(options).pipe(res);


  //PREVENIR MULTIPLES CARGA DE DATOS 50000
  /*
  var stream = request(options).pipe(res);
    stream.on('finish', function (abc) {
      res.send(200);
  });
  */

}
 
module.exports = UserReport;