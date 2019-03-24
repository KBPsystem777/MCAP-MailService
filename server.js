const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const nodeMailer = require('nodeMailer')

require('dotenv').config()

const port = process.env.PORT || 1964


