const {response,request}= require('express');
const Usuario= require('../models/user');
const bcryptjs= require('bcrypt');
const generator = require('generate-password');


const userGet =async (req=request, res = response)=> {

    //http://localhost:8080/api/usuarios?name=Samuel&apell=santiago
    //const paramsquery=req.query;
    //tambien podriamos desestruturarlos y manejar valores definidos por si no vienen
    //const {name,apellido='santiago'}= req.query;
    // const boletos=[]
    
    // for (let i = 0; i < 30; i++) {
    //   boletos.push({nombre:'pedo',numero:i})
     //boletos.set(i,{nombre:i})
    //}
    
    // const boletos= new Map();
    // boletos.set(1,{nombre:'mario'})
    const {limite=10,desde=0}= req.query;
    // const usuarios= await Usuario.find({estado:true})
    //                              .skip(desde)
    //                              .limit(limite);

    // const total=await Usuario.countDocuments();

    const [total,usuarios] = await Promise.all([
      Usuario.countDocuments(),
      Usuario.find({estado:true})
             .skip(desde)
             .limit(limite)
    ]);


    res.json({
        //ok:true,
        //msg:'Get Api controllador',
        //paramsquery
        total,
        usuarios
      
    });
    
    
    
  }

  

const userPost =async (req, res = response)=> {
    //optenemos lo que viene en el requets
    //const body= req.body;
    const{nombre,correo,password,rol}= req.body; //desestructuracion de json

    var codigoinvitacion =generator.generate({
      length: 7,
      numbers: true,
      strict:true
    });
    try {
      const usuario=new Usuario({nombre,correo,password,rol,codigoinvitacion});
      //encryptar pasword
      const salt=bcryptjs.genSaltSync();
      usuario.password=bcryptjs.hashSync(password,salt);
    //guardar documento
   await usuario.save();
  
    res.json({
        //ok:true,
        //msg:'Post Api controllador',
        usuario
    });
    } catch (error) {
      console.log(error);
    }
    
  }

const userPut = async(req, res = response)=> {
    //para recibir parametro en segmentos tenemos wue definirlos en la ruta
    //y reciperarlos con params
    const idreq= req.params.id;
    const {_id,password,google,correo,codigoinvitacion,...resto}= req.body;
    //validar contra la base de datos
    if (password) {
      const salt=bcryptjs.genSaltSync();
      resto.password=bcryptjs.hashSync(password,salt);
    }

    const usuario= await Usuario.findByIdAndUpdate(idreq,resto, {new: true});
    //const usuario= await Usuario.findOneAndUpdate(idreq,resto,{new:true}); 
    res.json(usuario)
  }

const userDelete =async (req, res = response)=> {

    const idreq= req.params.id;

    //const uid= req.uid;
    //const userAuth= req.userAuth;

    //const usuario=await Usuario.findByIdAndDelete(idreq);
    const usuario=await Usuario.findByIdAndUpdate(idreq,{estado:false},{new:true})
    
    res.json({
        //ok:true,
        //msg:'Delete Api controllador'
        
        usuario,
  
      })
  }



module.exports={
    userGet,
    userPost,
    userPut,
    userDelete
}