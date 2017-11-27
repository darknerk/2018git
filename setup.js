//Require DB para sincronizar
import db from './server/models'


db.sequelize.sync({ force: true }).then( ()=>{
  db.user.create({
    username:'admin',
    password:'admin',
    nombres:'Administrador',
    apellidos:'Administrador',
    hostname:'192.168.1.10'
  })
})