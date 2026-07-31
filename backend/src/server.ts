import express from 'express'
import app from './app.js'

const server = express()

server.use('/', app)

server.listen(3001, () => {
    console.log('servidor rodando em http://localhost:3001/')
})