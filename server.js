//Requerir Depedencias
import http from 'http'
import cluster from 'cluster'
import { cpus } from 'os'
import express from 'express'
import cors from 'cors'
import bodyParser  from 'body-parser'
import passport from 'passport' 
import helmet from 'helmet'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'

//Require Log
import logger from './logs'

//Require DB para sincronizar
import db from './server/models'

//Require Strategy
import hookJWTStrategy from './server/services/passportStrategy/passportStrategy'

//Requiere Error Middleware
import ErrorMiddleware from './server/middleware/error'

//Requiere Rutas
import RouterPrincipal from './server/router/index'



//CLUSTER CPUS
if (cluster.isMaster) {
  
  const numCPUs = cpus().length
  for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
  }

  console.log('Clustering: Comienza ' + numCPUs + ' workers...')

  cluster.on('online', (worker)=> {
      console.log('Worker ' + worker.process.pid + ' está en linea ahora!');
  });

  cluster.on('exit', (worker, code, signal) => {
      console.log('Worker ' + worker.process.pid + ' murio en el codigo: ' + code + ', y señal: ' + signal)
      console.log('Comenzando un nuevo Worker.')
      cluster.fork()
  })

}else{
  //Instancia Express
  const app=express()
  let PORT = process.env.PORT || 5100;

  // CORS
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS')
    next()
  })
  
  app.use(cors())

  //Security Http Encabezados y Cookie CRFS
  app.use(helmet());
  app.use(cookieParser()) 
  app.disable('x-powered-by');

  /* --- MIDDLEWARES Express app Handler Data Parsing --- */
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended:true}))
  app.use(bodyParser.text())
  app.use(bodyParser.json({type:"application/vnd.api+json"}))
  app.use(methodOverride())

  ////////////////// PRUEBA

  //import routerPrueba from './server/router/security/security'
  //app.use('/asd',routerPrueba)

  //Inicializar passport
  app.use(passport.initialize());
  hookJWTStrategy(passport)

  //Static Directory
  app.use('/',express.static('public'))

  //Instancia Ruta Auth
  app.use('/api',RouterPrincipal)

  // LOG
  app.use(require('morgan')('combined', { 'stream': logger.stream }))


  //Error Middleware
  app.use((err, req, res, next)=> {
    const error = new Error('Not found')
    err.status = 404
    next(err)
  })
  
  app.use((req, res, next) => {
      res.status(404)
      res.json({ message: 'Ruta desconocida.' })
      next()
  })
  
  app.use((err, req, res, next)  => {
      if (err.name === 'UnauthorizedError') {
          res.status(401).json({ error: 'Sin authorizacion. Token Inválido!' })
      }
      if(err.name==='Unauthorized'){
        res.status(401).json({ error: 'Sin authorizacion. Token Inválido!' })
      }
      next()
  })
  
  app.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.json({ error: err.message })
      next()
  })


  //* --- SERVER START EXPRESS--- */
  /*
  app.listen(PORT,()=>{
    console.log('Puerto Escucha en: localhost:'+PORT)
  })
  */

  /* --- SERVER START HTTP--- */
  const port = process.env.PORT  || 5100
  const server = http.createServer(app)
  
  server.listen(port)
  
  server.on("error", (error) => {
      if (error.syscall !== "listen") {
          throw error
      }

      const bind = typeof port === "string"
      ? "Pipe " + port
      : "Port " + port

      switch (error.code) {
          case "EACCES":
              console.error(bind + " requiere elevacion de Privilegios.")
              process.exit(1)
              break
          case "EADDRINUSE":
              console.error(bind + " esta Ocupado")
              process.exit(1)
              break
          case "ECONNREFUSED":
            console.error(bind + " Error por falta de Conexion de otro servicio.")
            process.exit(1)
            break
          default:
              throw error
      }
  })

  server.on("listening", () => {
      const addr = server.address()

      const bind = typeof addr === "string"
      ? "pipe " + addr
      : "port " + addr.port
      console.log('Servidor está en Ejecucion en el proceso ' + process.pid + ', del Puerto ' + addr.port + '\n')
  })

}