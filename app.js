const express = require('express');
const jwt =require('jsonwebtoken');
const app = express();
const fs = require('fs')


let secret = fs.readFileSync('secret.key')

app.get('/api', (rq,res)=>{
    res.json({
        message : 'hello world'
    })
})


app.post('/api/post', veriyfyToken, (req,res)=>{

    jwt.verify(req.token, secret, (err, data)=>{
        if(err){
            res.sendStatus(403)
            
        }
        res.json({
            message:"Create Post",
            data
        })
    })
    
})


app.post('/api/login', (req,res)=>{
    const user = {
        id : 1,
        user : "mofed",
        pass : 'mofed'
    }

    jwt.sign({user},secret, (err, token)=>{

        if(err){
            res.json({
                message:"this user not correct"
            })
        } 
        
       res.json(token)
    })
    
})


function veriyfyToken(req,res,next){
    // form of token is => Authorization: Bearer <token>
    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader != 'undefined'){
        // split at the space between bearer and  <token<
        const bearer = bearerHeader.split(' ')

        // get token from array 
        const token = bearer[1]

        // set the token
        req.token = token

        next()
    } else {
        res.sendStatus(403)
    }
    
}

app.listen('5000', ()=> console.log('server started on port 5000'))