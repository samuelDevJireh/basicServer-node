const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");
const {Usuario,Categoria,Producto}=require('../models');


const colecionesPermitidas=[
    'productos',
    'categorias',
    'usuarios'
];

const buscarUsuarios= async(termino, res = response) => {

    const isMongoid= isValidObjectId(termino);
    try {
        if (isMongoid) {
            const usuario=await Usuario.findById(termino);
          return res.json({
              results:(usuario)? [usuario]:[]
          });
        }

        const regex=new RegExp(termino,'i');

        const usuarios= await Usuario.find({
            $or: [{nombre:regex},{correo:regex}],
            $and: [{estado:true}]
        });

        res.json({
            results:usuarios
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            error:[
                error
            ]
        });
    }
}

const buscarCategoria= async(termino, res = response) => {

    const isMongoid= isValidObjectId(termino);
    try {
        if (isMongoid) {
            const categoria=await Categoria.findById(termino);
          return res.json({
              results:(categoria)? [categoria]:[]
          });
        }

        const regex=new RegExp(termino,'i');

        const categorias= await Categoria.find({nombre:regex,estado:true});

        res.json({
            results:categorias
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            error:[
                error
            ]
        });
    }
}

const buscarProducto= async(termino, res = response) => {

    const isMongoid= isValidObjectId(termino);
    try {
        if (isMongoid) {
            const producto=await Producto.findById(termino).populate('categoria','nombre');
          return res.json({
              results:(producto)? [producto]:[]
          });
        }

        const regex=new RegExp(termino,'i');
        //esto nos ayudaria abuscar por categoria el producto
        //     const categories = await Category.find({ name: regex, status: true})
        
        // const products = await Product.find({
        //     $or: [...categories.map( category => ({
        //         category: category._id
        //     }))],
        //     $and: [{ status: true }]
        // }).populate('category', 'name')

        const productos= await Producto.find({
            $or: [{nombre:regex}],
            $and: [{disponible:true}]
        }).populate('categoria','nombre');

        res.json({
            results:productos
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            error:[
                error
            ]
        });
    }
}





const buscar= async(req= request,res= response) => {

    const {collection,termino}=req.params;

    if (!colecionesPermitidas.includes(collection)) {
     return res.status(400).json({
            errors:[{msg:`La coleccion: ${collection} no existe`}]
           });
    }
  
    try {
        switch (collection) {
            case 'productos':
                  buscarProducto(termino,res);
                break;
            case 'categorias':
                  buscarCategoria(termino,res);
                break;
            case 'usuarios':
                   buscarUsuarios(termino,res);
                break;
        
            default:             
            res.status(500).json({
                errors:[{msg:`No se pudo realizar la busqueda`}]
               });

                break;
        }
        
    } catch (error) {
        console.log(error);

    }
    
}


module.exports={
    buscar
}