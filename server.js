//Requerir Depedencias
import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser  from 'body-parser'
import passport from 'passport' 
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

//Require Log
import logger from './logs'

//Require DB para sincronizar
import db from './server/models'

//Require Strategy
import hookJWTStrategy from './server/services/passportStrategy/passportStrategy'

//Requiere Rutas
import RouterPrincipal from './server/router/index'

//Instancia Express
const app=express()
let PORT = process.env.PORT || 5100;


//Security Http Encabezados y Cookie CRFS
app.use(cors())
app.use(helmet());
app.use(cookieParser()) 

////////////////// PRUEBA

//import routerPrueba from './server/router/security/security'
//app.use('/asd',routerPrueba)

///////////////

//Express app Handler Data Parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.text())
app.use(bodyParser.json({type:"application/vnd.api+json"}))


//Inicializar passport
app.use(passport.initialize());
hookJWTStrategy(passport)

//Static Directory
app.use('/',express.static('public'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 
  /*
  res.header('Access-Control-Expose-Headers','Authorization');
  res.Header('Access-Control-Allow-Credentials',true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  */
  next();
});


//Instancia Ruta Auth
app.use('/api',RouterPrincipal)


// LOG
app.use(require('morgan')('combined', { 'stream': logger.stream }))

/*
sync({ force: true }) -> Eliminar tablas y agregarlos nuevamente

db.user.create({
    username:'admin',
    password:'admin',
    nombres:'Administrador',
    apellidos:'Administrador',
    hostname:'192.168.1.10'
  })
*/ 
app.listen(PORT,()=>{
  console.log('Puerto Escucha en: localhost:'+PORT)
})
// Sincronizar Db y Listar Puerto
/*
db.sequelize.sync().then( ()=>{

  app.listen(PORT,()=>{
    console.log('Puerto Escucha en: '+PORT)
  }) 
})
*/
/*
db.sequelize.sync({ force: true }).then( ()=>{
    db.user.create({
      username:'admin',
      password:'admin',
      nombres:'Administrador',
      apellidos:'Administrador',
      hostname:'192.168.1.10'
    })
     
  })

*/




