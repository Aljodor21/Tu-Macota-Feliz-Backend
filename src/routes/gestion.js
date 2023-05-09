const express = require('express');
const pool = require('../database');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth')
const email = require('../lib/emails')

//Transporte del correo

router.get('/registerPet', isLoggedIn, (req, res) => {
    res.render('register/registroPet')
})

router.post('/registerPet', isLoggedIn, async (req, res) => {
    const { name, raza, color, historia } = req.body;
    const newPet = {
        name,
        raza,
        color,
        historia,
        user_id: req.user.id
    }
    await pool.query('INSERT INTO pets SET ?', [newPet]);
    req.flash('success','Mascota registrada')
    res.redirect('/gestion/');


})

router.get('/', isLoggedIn, async (req, res) => {
    const pets = await pool.query('SELECT * FROM pets WHERE user_id = ?', [req.user.id]);

    for (let i = 0; i < pets.length; i++) {
        pets[i].isTrue = false;
        if (pets[i].plan_id > 0) {
            pets[i].isTrue = true;
        }
    }
    res.render('register/listPets', { pets });
})

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const pets = await pool.query('DELETE FROM pets WHERE id =?', id);

    req.flash('success','Mascota borrada exitosamente')
    res.redirect('/gestion/');
})

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const pet = await pool.query('SELECT * FROM pets WHERE id =?', id);

    res.render('register/edit', pet[0]);
})

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { name, raza, color, historia } = req.body;

    const pet = {
        name,
        raza,
        color,
        historia
    }
    await pool.query('UPDATE pets SET ? WHERE id =?', [pet, id]);
    console.log('Actualizo')

    req.flash('success','Mascota editada');
    res.redirect('/gestion/');
})

router.get('/plan/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;

    const rows = await pool.query('SELECT * FROM pets WHERE id=? AND plan_id IS NULL', [id])

    if (rows.length > 0) {
        res.render('register/plan', rows[0])

    } else {
        res.redirect('/gestion/service/'+id)

    }

    //res.render('register/plan')
});

router.post('/plan/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { plan_id } = req.body;


    await pool.query('UPDATE pets SET plan_id = ? WHERE id =?', [plan_id, id])

    req.flash('success','Plan adquirido satisfactoriamente');
    res.redirect('/gestion/');

});

router.get('/service/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;

    const pet = await pool.query('SELECT * FROM pets WHERE  id=?', id);
    const services = await pool.query('SELECT * FROM services WHERE  plan_id=?', pet[0].plan_id);

    services[0].ide=id
    services[1].ide=id
    services[2].ide=id

    res.render(`register/gestion`, { services })


});

router.get('/services/:id/gest/:ide',isLoggedIn, async (req, res) => 
{

    const  {id,ide}  = req.params;

    const resp=await pool.query('SELECT received FROM pets WHERE id=?',ide)
    

    if(resp[0].received==='null' || resp[0].received<3){
        res.render(`services/${id}`,req.params)
    }else{
        res.redirect('/gestion/')
    }
    
            
        
});

router.post('/services/:id/gest/:ide',isLoggedIn,async (req, res) => {
    const  {id,ide}  = req.params;
    const {date}=req.body;

    const pet=await pool.query('SELECT * FROM pets WHERE id=?',ide);
    let count=pet[0].received+1;
    
    console.log(count)
    
    await pool.query('UPDATE pets SET received = ? WHERE id =?', [count, ide])
    
    
    email.mailOptions={
        to:req.user.email,
        subject:"Tu mascota feliz",
        text:`Este es un correo para confirmar una adquisición\nMascota: ${pet[0].name}\nRecuerde: ${date}`
    }


    await email.transporter.sendMail(email.mailOptions);
    
    req.flash('success','Servicio gestionado');
    res.redirect(`/gestion/service/${ide}`)


    
            
        
});

module.exports = router