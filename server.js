const express = require('express')
const app = express()
const db = require('./app/models')
const cors = require('cors')

const port = 3000
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000','http://127.0.0.1:3000']
}))

app.listen(port, async () => {
    await db.sequelize.sync()
    console.log("Servidor ejecutando Puerto: "+port);
})


const userRoutes = require('./app/routes/user.routes.js')
const bootcampRoutes = require('./app/routes/bootcamp.routes.js')


app.use(userRoutes)
app.use(bootcampRoutes)


