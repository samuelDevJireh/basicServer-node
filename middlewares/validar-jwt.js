const { response, request } = require('express');
const Usuario= require('../models/user');
const jwt =require('jsonwebtoken');

const validarJWT=async (req = request,res= response,next) => {

    const token = req.header('x-token');

    if (!token) {
       return res.status(401).json({
        errors:[{msg:'error de autentificacion'}]
       }); 
    }
   
    try {

       const {uid}= jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        //leer usuario autenticado por uid
        const userAuth= await Usuario.findById(uid);
        if (!userAuth || !userAuth.estado) {
            return res.status(401).json({
                errors:[{msg:'error de autentificacion - usuario'}]
               }); 
        }
       //req.uid=uid;
       req.userAuth=userAuth;
       //console.log(payload);

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            errors:[{msg:'token invalid'}]
           });
    }

    
}


module.exports={
    validarJWT
}