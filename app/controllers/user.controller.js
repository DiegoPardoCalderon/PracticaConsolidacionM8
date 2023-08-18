const { users } = require('../models')
const db = require('../models')
const User = db.users
const Bootcamp = db.bootcamps

const bcrypt = require('bcryptjs')
const validaciones = require('./../middleware/index.js')
const tokenValidations = validaciones.validateToken

// Crear y Guardar Usuarios
exports.createUser = (user) => {
  return User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: bcrypt.hashSync(user.password, 10)
    })
    .then(user => {
      console.log(`>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`)
      return user
    })
    .catch(err => {
      console.log(`>> Error al crear el usuario ${err}`)
    })
}

// obtener los bootcamp de un usuario
exports.findUserById = (userId) => {
  return User.findByPk(userId, {
      include: [{
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        }
      }, ],
    })
    .then(users => {
      return users
    })
    .catch(err => {
      console.log(`>> Error mientras se encontraba los usuarios: ${err}`)
    })
}

// obtener todos los Usuarios incluyendo los bootcamp
exports.findAll = () => {
  return User.findAll({
    include: [{
      model: Bootcamp,
      as: "bootcamps",
      attributes: ["id", "title"],
      through: {
        attributes: [],
      }
    }, ],
  }).then(users => {
    return users
  })
}

// Actualizar usuarios
exports.updateUserById = (userId, fName, lName) => {
  return User.update({
      firstName: fName,
      lastName: lName
    }, {
      where: {
        id: userId
      }
    })
    .then(user => {
      console.log(`>> Se ha actualizado el usuario: ${JSON.stringify(user, null, 4)}`)
      return user
    })
    .catch(err => {
      console.log(`>> Error mientras se actualizaba el usuario: ${err}`)
    })
}

// Actualizar usuarios
exports.deleteUserById = (userId) => {
  return User.destroy({
      where: {
        id: userId
      }
    })
    .then(user => {
      console.log(`>> Se ha eliminado el usuario: ${JSON.stringify(user, null, 4)}`)
      return user
    })
    .catch(err => {
      console.log(`>> Error mientras se eliminaba el usuario: ${err}`)
    })
}

/* ruta login */
exports.loginUser = async (userData) =>{
  const {email, password} = userData
  const wantedUser = await User.findOne({ where: {email: email} })
  if(!wantedUser){
    throw 'Usuario no Registrado'
  }else if(!bcrypt.compareSync(password, wantedUser.password)){
    throw 'Usuario y/o Contraseña incorrectos'
  }
  const accessToken = tokenValidations.encodeToken(wantedUser)
  const objUser = {
    id: wantedUser.id,
    firstName: wantedUser.firstName,
    lastName: wantedUser.lastName,
    email: wantedUser.email,
    accessToken: accessToken
  }
  return objUser
}