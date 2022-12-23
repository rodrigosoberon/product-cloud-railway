const {Router} = require('express')
const passport = require('passport')

const authWebRouter = Router()

authWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

//---------------------------------------------------------------------------------
//LOGIN
authWebRouter.get('/login', (req, res) => {
    if(req.isAuthenticated()){
        let username = req.user.username;
        res.render('home', {username})
    }else{
        res.render('login')
    }

})

authWebRouter.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login-fail',
}))

authWebRouter.get('/login-fail', (req, res) => {
    res.render('login-fail')
})


//---------------------------------------------------------------------------------
//REGISTER

authWebRouter.get('/register', (req, res) => {   // devuelve la vista de registro
    res.render('register')
})

authWebRouter.post('/register', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/register-fail',
}))

authWebRouter.get('/register-fail', (req, res) => {
    res.render('register-fail')
})

//---------------------------------------------------------------------------------
//LOGOUT

authWebRouter.get('/logout', (req, res) => {
    let username = req.user.username;
    req.session.destroy(err => {
        if(err) return res.send(err)
        res.render('logout', {username})
    })
})


module.exports = authWebRouter