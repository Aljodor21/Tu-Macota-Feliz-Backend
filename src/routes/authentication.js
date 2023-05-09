const express = require('express');
const router = express.Router();
const passport=require('passport');
const {isLoggedIn,isNotLoggeIn}=require('../lib/auth')



router.get('/login',isNotLoggeIn,(req,res)=>{
    res.render('user/login')
});

router.post('/login',isNotLoggeIn,(req,res,next)=>{
    passport.authenticate('local.login',{
        successRedirect:'/profile',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next)
});

router.get('/registro',isNotLoggeIn,(req,res)=>
{
    
    res.render('user/registro')
});

router.post('/registro',isNotLoggeIn,passport.authenticate('local.registro',{
    successRedirect: '/profile',
    failureRedirect:'/registro',
    failureFlash:true
}));

router.get('/profile',isLoggedIn,(req,res)=>{
    
    res.render('user/profile');
});

router.get('/logout',(req,res)=>{
    req.logOut(req.user,err=>{
        if(err) return next(err);
        res.redirect("/login");
    });
    
});

module.exports = router