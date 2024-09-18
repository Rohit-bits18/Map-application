const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config()

const {Server} = require('socket.io')
const {createServer} = require('http')
const server = createServer(app)
const io = new Server(server)

app.set('view engine','ejs')
// app.set(express.static(path.resolve('./views')))
app.set('views',path.resolve('./views'))


app.get('/map',(req,res)=>{
    res.render('index')
})


io.on('connection',(socket)=>{
    console.log('connectedd')

    socket.on('coods',(data)=>{
        console.log(data)
        io.emit('receive-coods',{id:socket.id,...data})
    })

    io.on('disconnect',()=>{
        io.emit('user-dissconnect',{id:socket.id})
    })
})

server.listen(process.env.port,()=>{
    console.log('server is connected')
})