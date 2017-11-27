import express from 'express'
import passport from 'passport'


//Require Controlladores
import AuthController from '../controllers/authController'
import VerificarDbController from '../controllers/verificarDbController'
import AdminController from '../controllers/adminController'
import userController from '../controllers/userController'
import EnumController from '../controllers/enumController'

//Require Controllers Reporte
import UserReport from '../reportControllers/userControllerReport'

 
//Instancia Express y Passport
var router = express.Router()
var authenticate=passport.authenticate('jwt', { session: false })

//Ruta de Authentication
router.post('/v1/auth/signip',AuthController.authenticate)

//Ruta par Verificar Conexion de base de datos 
router.get('/v1/verificarDb', VerificarDbController.index)


//Rutas de Prueba
router.get('/admin', authenticate , (req,res)=>{
  res.send("admin prueba") 
}); 
   
//Ruta de Usuarios
router.get('/v1/user/all',authenticate,userController.allUser)
router.get('/v1/user/all/:username',authenticate,userController.getUser)
router.post('/v1/user/register',authenticate,userController.register)         //POST GUARDAR DATOS
router.put('/v1/user/update/:username',authenticate,userController.update)    //PUT MODIFICAR DATOS
router.delete('/v1/user/delete/:username',authenticate,userController.delete) //DELETE ELIMINAR DATOS

//Ruta para Reportes PDF  
router.get('/v2/jsReport/user',UserReport.Index)
router.get('/v2/jsReport/render',UserReport.CargaRender)


//Enumeracion por Modelos 
router.get('/v1/models/enum',authenticate,EnumController.enum)

module.exports = router