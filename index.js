const express = require('express')
const app = express()
const cors = require('cors')
 
require('dotenv').config()
const port = process.env.SERVER_PORT;

const userRoute = require('./api/routers/userrouter')
const productRoute = require('./api/routers/productrouter')

//MIDDLEWARE
app.use(express.json())

// CORS
app.use(cors());

//API ROUTES
app.use('/api', userRoute)
app.use('/api', productRoute)



app.listen(port, () => console.log(`App listening on http://localhost:${port}`))  