const { Categoria,Rol,Usuario, Producto } = require('../models');

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

const emailLogin = async(correo ='') =>{
   const userExist= await Usuario.findOne({correo});
    if (!userExist) {
        //  return res.status(400).json({
        //  errors:[{msg:'Este correo ya esta registrado'}]
        // });
        throw new Error(`email invalido`);   
    }

    if(!userExist.estado){
      throw new Error(`Cuenta bloqueada temporalmente contacta al Admin`);   
  }
}

const isValidId = async(id = '')=> {
    const usuarioExist= await Usuario.findById(id)
    if (!usuarioExist) {
      throw new Error(`No existe usuario con id: ${id}`);
    }
  }
const existeCategoria = async(id = '')=> {
    const categoria= await Categoria.findById(id)
    if (!categoria) {
      throw new Error(`No existe categoria con id: ${id}`);
    }
    if (!categoria.estado) {
      throw new Error(`La categoria: ${categoria.nombre}, esta bloqueda`);
    }
  }

const existeProducto = async(id = '')=> {
    const producto= await Producto.findById(id)
    if (!producto) {
      throw new Error(`No existe categoria con id: ${id}`);
    }
    if (!producto.estado) {
      throw new Error(`La producto: ${producto.nombre}, ya no esta disponible`);
    }
  }

  const coleccionesPermitidas=(col='',permitidas=[]) => {

    if (!permitidas.includes(col)) {
      throw new Error(`La collecion: ${col}, no esta permitida`);
    }

    return true;
  }


  module.exports={
      isValidRol,
      emailexist,
      isValidId,
      emailLogin,
      existeCategoria,
      existeProducto,
      coleccionesPermitidas
  }