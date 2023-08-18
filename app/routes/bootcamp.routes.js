const express = require('express')
const {Router} = express
const router = Router()
const bootcampController = require('./../controllers/bootcamp.controller.js')

const validaciones = require('./../middleware/index.js')
const emailValidations = validaciones.validateEmail
const tokenValidations = validaciones.validateToken

let decodeTokenID

router.use((request, response, next) =>{
    const headToken = request.headers.authorization
    const decodeToken = tokenValidations.decodeToken(headToken)

    if(request.url === '/api/bootcamp'){
        next()
    }else{
        if(decodeToken === '000'){
            return response.status(403).json({ success: false, message: 'Token invalido' })
        }else{
            next()
        }
    }
})

router.post('/api/bootcamp', async (request,response) =>{

    try{
        const bootcamp = await bootcampController.createBootcamp(request.body)
        return response.json({ success:true, message: 'Bootcamp creada', data: bootcamp })
    }catch(err){

    }
})

router.post('/api/bootcamp/adduser', async (request, response) =>{
    const {idBootcamp, idUser} = request.body
    /*validar que el usuario que se esta ingresado sea el logeado*/
    try{
        const matricula = await bootcampController.addUser(idBootcamp,idUser)
        return response.json({ success:true, message: 'matriculado', data: matricula })
    }catch(err){

    }
})

router.get('/api/bootcamp/:id', async (request, response) =>{
    const idBootcamp = request.params.id
    const detalleBootcamp = await bootcampController.findById(idBootcamp)
    return response.json({ success: true, message: 'Bootcamp', data: detalleBootcamp })
})

router.get('/api/bootcamp', async (request, response) =>{
    const idBootcamp = request.params.id
    const detalleBootcamp = await bootcampController.findAll()
    return response.json({ success: true, message: 'Bootcamp', data: detalleBootcamp })
})


module.exports = router

/*



router.post('/api/signup', async (request, response) =>{
    if(!request.body.firstName){
        return response.status(400).json({ success: false, message: 'Debe Indicar el Nombre del Usuario' })
    }
    if(!request.body.lastName){
        return response.status(400).json({ success: false, message: 'Debe Indicar el Apellido del Usuario' })
    }
    if(!request.body.email){
        return response.status(400).json({ success: false, message: 'Debe Indicar el Correo del Usuario' })
    }else{
        const validEmail = await emailValidations.validateEmail(request.body.email)
        if(validEmail){
            return response.status(400).json({ success: false, message: 'El correo indicado ya esta en uso' })
        }
    }
    if(!request.body.password){
        return response.status(400).json({ success: false, message: 'Debe Indicar una contraseña para el Usuario' })
    }else if(request.body.password.length < 8){
        return response.status(400).json({ success: false, message: 'El password debe tener al menos 8 caracteres' })
    }

    try{
        const usuario = await userController.createUser(request.body)
        return response.json({ success:true, data: usuario})
    }catch(err){
        return response.status(1).json({ success: false, message: 'as', data: err })
    }
    
})

router.post('/api/signin', async (request, response) =>{
    try{
        const token = await userController.loginUser(request.body)
        return response.json({ success: true, message: 'Usuario Encontrado', data: token })
    }catch(err){
        return response.status(404).json({ success: false, message: err })
    }
})


router.get('/api/user/:id', async (request, response) =>{
    const idUser = request.params.id
    const wantedUser = await userController.findUserById(idUser)
    return response.json({ success: true, message: 'Usuario Encontrado', data: wantedUser })
})


router.get('/api/user', async(request, response) =>{
    const wantedUSers = await userController.findAll()
    return response.json({ success: true, message: 'Listado de Usuarios', data: wantedUSers })
})


router.put('/api/user/:id', async (request, response) =>{
    const idUser = request.params.id
    if(Number(idUser) !== Number(decodeTokenID)){
        return response.status(400).json({ success: false, message: 'Solo puede editar SU información' })
    }
    const {firstName, lastName} = request.body
    if(!firstName && !lastName){
        return response.status(400).json({ success: false, message: 'Debe Indicar Nombre o Apellido a actualizar' })
    }
    const updatedUser = await userController.updateUserById( idUser,firstName,lastName )
    return response.json({ success: true, message: 'Usuario Actualizado' })
})


router.delete('/api/user/:id', async (request, response) =>{
    const idUser = request.params.id
    if(!idUser){
        return response.status(400).json({ success: false, message: 'Debe Indicar el Usuario a Eliminar' })
    }
    const deletedUser = await userController.deleteUserById(idUser)
    return response.json({ success: true, message: 'Usuario Eliminado' })
})


module.exports = router


*/

//app.post('/api/bootcamp')
//app.post('/api/bootcamp/adduser')
//app.get('/api/bootcamp/:id')
//app.get('/api/bootcamp'

