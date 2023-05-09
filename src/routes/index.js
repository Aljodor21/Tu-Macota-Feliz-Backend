const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    res.render('home/index')
});

router.get('/somos',(req,res)=>{
    res.render('home/somos')
});

router.get('/contacto',(req,res)=>{
    res.render('home/contacto')
});




module.exports = router