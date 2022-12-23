const {Router} = require('express')
const randomsWebRouter = Router()
const {fork} = require('child_process')
randomsWebRouter.get('/api/randoms', (req,res)=>{
    const cant = parseInt(req.query.cant) || 100000000
    const forked = fork('calculo.js')
    forked.send(cant)
    forked.on('message', msg=>{
        res.json(msg)
    })
})
module.exports = randomsWebRouter