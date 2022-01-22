const { response, request } = require("express");
const bcryptjs= require('bcrypt');

const Usuario= require('../models/user');
const { generarJWT } = require("../helpers/generateJWT");


const login = async (req = request, res = response )=>{


    const { correo,password}= req.body;
   
    try {
        // verificar si el email existe
        const usuario= await Usuario.findOne({correo});
            if (!usuario) {
                 return res.status(400).json({
                 errors:[{msg:'email incorrecto'}]
                });
                  
            }
         // verificar que el usuario este activo
            if(!usuario.estado){
                return res.status(400).json({
                    errors:[{msg:'sin acceso'}]
                   });
            }

        //verificar contraeña
        const validPassword= bcryptjs.compareSync(password,usuario.password)
            if (!validPassword) {
                return res.status(400).json({
                    errors:[{msg:'password incorrecto'}]
                   });
            }

        //generar jwt
        const token =await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            msg:"Problema interno contacte al administrador"
        });
    }

    
}



module.exports={
    login
}