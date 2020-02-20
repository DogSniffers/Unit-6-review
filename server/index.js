// General Imports
require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
// Controller imports
const authCtrl = require('./authController')
const ctrl = require('./controller')
const {SERVER_PORT,CONNECTION_STRING,SESSION_SECRET} = process.env

const app = express()

app.use(express.json())

// THIS WILL BE THE SAME FOR DEVELOPMENT FROM HERE ON
// Session Secret is important one here
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        rejectUnauthorized:false,
        cookie: {maxAge: 1000 * 60 * 60},
        secret: SESSION_SECRET
    })
)

massive({
    connectionString: CONNECTION_STRING,
    ssl:{
        rejectUnauthorized: false
    }
}).then(db => {
    const port = SERVER_PORT
    // This is setting the Database
    app.set('db',db)
    // We put the listen inside of the Massive
    app.listen(port || 4040, ()=>console.log(`Server running on ${port}`))
    console.log('DB Connected')

})

//#auth endpoints
//TODO login, register, logout, get user
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/logout', authCtrl.logout);
app.get('/api/user', authCtrl.getUser);

//#post endpoints
//TODO get post put delete posts
//?user id
app.get('/api/posts/:id', ctrl.getPosts);
//?user id
app.post('/api/posts/:id', ctrl.addPost);
//?post id
app.put('/api/posts/:id', ctrl.editPost);
//?post id
app.delete('/api/posts/:id', ctrl.deletePost);