const { response, request } = require("express");
const { subirArchivo } = require("../helpers/load-file");
const { Usuario, Producto } = require("../models");
const path= require('path');
const fs= require('fs')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const loadFiles=async (req,res = response) => {
  
    try {
        // console.log('req.files >>>', req.files); // eslint-disable-line
    //const urlFinal= await subirArchivo(req.files,['txt','md'],'textos')
    const urlFinal= await subirArchivo(req.files,undefined,'img')

    res.json({url:urlFinal})
    } catch (error) {
      res.status(400).json({error});

    }
 
}

const actualizarImagen=async(req= request,res=response) => {

  const{collection,id}=req.params;

  let modelo;

  try {
    switch (collection) {
      case 'usuarios':

          modelo= await Usuario.findById(id);
          if (!modelo) {
            return res.status(400).json({errors:[{msg:'no existe usuario con id: '+id}]})
          }
        
        break;
      case 'productos':

          modelo= await Producto.findById(id);
          if (!modelo) {
            return res.status(400).json({errors:[{msg:'no existe producto con id: '+id}]})
          }
        
        break;
      
      case 'categorias':
        
        break;
    
      default: 
          return res.status(500).json({errors:[{msg:'Se requiere permiso de administrador'}]})
        
    }

    //limpiar imagenes previas
    if (modelo.img) {
      //borra imagen del servidor
      const pathImagen= path.join(__dirname,'../uploads',collection,modelo.img);
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);//borra el archivo de la ruta
      }
    }
    

    modelo.img = await subirArchivo(req.files,undefined,collection,'img');

    await modelo.save();

  res.json({modelo});
    
  } catch (error) {
     console.log(error);
     res.json({error})
  }

}

const actualizarImagenCloudinary=async(req= request,res=response) => {

  const{collection,id}=req.params;

  let modelo;

  try {
    switch (collection) {
      case 'usuarios':

          modelo= await Usuario.findById(id);
          if (!modelo) {
            return res.status(400).json({errors:[{msg:'no existe usuario con id: '+id}]})
          }
        
        break;
      case 'productos':

          modelo= await Producto.findById(id);
          if (!modelo) {
            return res.status(400).json({errors:[{msg:'no existe producto con id: '+id}]})
          }
        
        break;
      
      case 'categorias':
        
        break;
    
      default: 
          return res.status(500).json({errors:[{msg:'Se requiere permiso de administrador'}]})
        
    }

    //limpiar imagenes previas
    if (modelo.img) {
     
      const nombreArr=modelo.img.split('/');
      const nombre= nombreArr[nombreArr.length -1]
      const [public_id]=nombre.split('.');
      console.log(public_id);
      
      cloudinary.uploader.destroy(`curso-node/${collection}/${public_id}`)
    }
    
    const {tempFilePath}=req.files.archivo;
    const {secure_url}= await cloudinary.uploader.upload(tempFilePath,{folder:`curso-node/${collection}`});
    modelo.img=secure_url;
    
    await modelo.save();

    res.json({modelo});
    
  } catch (error) {
     console.log(error);
     res.json({error})
  }

}

const obtenerImagen= async(req=request,res=response) => {

  const{collection,id}=req.params;

  let modelo;

  try {
    switch (collection) {
      case 'usuarios':
          modelo= await Usuario.findById(id);
          if (!modelo) {
            return res.status(400).json({errors:[{msg:'no existe usuario con id: '+id}]})
          }
        break;
      case 'productos':
          modelo= await Producto.findById(id);
          if (!modelo) {
            return res.status(400).json({errors:[{msg:'no existe producto con id: '+id}]})
          } 
        break;
      case 'categorias':
        
        break;
    
      default: 
          return res.status(500).json({errors:[{msg:'Se requiere permiso de administrador'}]})
        
    }

    //limpiar imagenes previas
    if (modelo.img) {
      //borra imagen del servidor
      const pathImagen= path.join(__dirname,'../uploads',collection,modelo.img);
      if (fs.existsSync(pathImagen)) {
       return res.sendFile(pathImagen);
      }
    }
  //en caso de no encontrar imagen del usuario
  const pathNotImagen= path.join(__dirname,'../assets','no-image.jpg');
  res.sendFile(pathNotImagen);
    
  } catch (error) {
     console.log(error);
     res.json({error})
  }
}


module.exports={
    loadFiles,
    actualizarImagen,
    obtenerImagen,
    actualizarImagenCloudinary
}