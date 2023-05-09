const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Conexión con la base de datos
const pool=require('../database');
const helpers=require('../lib/helpers');

passport.use('local.login',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},async(req,username,password,done)=>{
    
    const rows=await pool.query('SELECT * FROM users WHERE email = ?',[username]);
    if(rows.length > 0){
        const user = rows[0];
        const res=await helpers.matchPassword(password,user.password);

        if(res){
            req.flash('success','Bienvenid@');
            return done(null,user);
        }else{
            req.flash('successf','Contraseña incorrecta');
            return done(null,false)
        }
    }else{
        req.flash('successf','Usuario no existe');
        return done(null,false)
    }

}));

passport.use('local.registro',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},async (req,username,password,done) => {
    
    const {login,nameu,address}=req.body;

    const newUser={
        login,
        password,
        email:username,
        nameu,
        address
    }

    newUser.password = await helpers.encryptPassword(password);

    const result = await pool.query('INSERT INTO users SET ?',[newUser]);
    newUser.id = result.insertId;

    return done(null, newUser)
}));


passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE id=?',[id]);
    done(null,rows[0]);
})