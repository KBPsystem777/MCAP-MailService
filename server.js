const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const nodeMailer = require('nodemailer')

require('dotenv').config()

const port = process.env.PORT || 1964

app.use(bodyParser, urlencoded())
app.get('/', (req, res) => res.send('Welcome to MCAP Mail Service!'))

app.listen(port, () => console.log(`Server Running on http://localhost:${port}`))