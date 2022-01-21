const Rol= require('../models/rol');
const Usuario= require('../models/user');

//validaciones contra la base de datos

const isValidRol = async(rol = '')=> {
    const rolExist= await Rol.findOne({rol});
    if (!rolExist) {
      throw new Error(`El rol ${rol} no existe`);
    }
  }

const emailexist = async(correo ='') =>{
   const emailExist= await Usuario.findOne({correo});
    if (emailExist) {
        //  return res.status(400).json({
        //  errors:[{msg:'Este correo ya esta registrado'}]
        // });
        throw new Error(`El correo: ${correo}, ya esta registrado`);   
    }
}

const isValidId = async(id = '')=> {
    const usuarioExist= await Usuario.findById(id)
    if (!usuarioExist) {
      throw new Error(`No existe usuario con id: ${id}`);
    }
  }


  module.exports={
      isValidRol,
      emailexist,
      isValidId
  }