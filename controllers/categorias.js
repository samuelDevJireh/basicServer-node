const { response, request } = require("express");
const { Categoria } = require("../models");

//obterner catergorias - paginado - total -populate
const obtenerCategorias= async(req= request,res=response) => {

    const {limite=10,desde=0}= req.query;

    // ejecuta varias promesas al mismo tiempo
    const [total,categorias] = await Promise.all([
        Categoria.countDocuments({estado:true}),
        Categoria.find({estado:true})
               .populate('usuario','nombre')
               .skip(desde)
               .limit(limite)
      ]);

    res.json({
        total,
        categorias
     });
}
// obtener categoria - populate
const obtenerCategoriaId=async(req= request, res=response) => {

    const {id}= req.params;
    const categoria=await Categoria.findById(id).populate('usuario','nombre');

    res.json({  
        categoria
     });
}



const crearCategoria= async( req=request, res=response) => {
     
    const nombre=req.body.nombre.toUpperCase();

    const categoriaDb=await Categoria.findOne({nombre});
    if (categoriaDb) {
       return res.status(400).json({
            errors:[{msg:`La categoria ${nombre} ya existe`}]
           });
    }
    //generar data a guardar
    const data={
        nombre:nombre,
        usuario:req.userAuth._id //viene del validador del jwt
    }
    //guardar en db
    const categoria= await new Categoria(data);
    await categoria.save();

    res.json({
        msg:'categorias created',
        categoria
     });
}
// actualizar categoria
const actualizarCategoria=async(req= request, res=response) => {

    const id= req.params.id;
    const nombre=req.body.nombre.toUpperCase();

try {
    const existeNombre= await Categoria.findOne({nombre})
    // const categoria=await Categoria.findById(id);
  
     if (existeNombre) {
         return res.status(400).json({
          errors:[{msg:`La categoria ${nombre} ya existe`}]
         });
     }

       const data={
           nombre,
           usuario:req.userAuth._id
       }
      const categoriaActualizada= await Categoria.findOneAndUpdate(id,data,{new:true});
  
      res.json({  
         categoriaActualizada
       });
    
} catch (error) {
    res.status(400).json({
        errors:[error]
       });
}
  
}
// eliminar categoria
const eliminarCategoria =async (req, res = response)=> {

    const idreq= req.params.id;
    //const uid= req.uid;
    const userAuth= req.userAuth._id;
    //const usuario=await Usuario.findByIdAndDelete(idreq);
    const categoria=await Categoria.findByIdAndUpdate(idreq,{estado:false,usuario:userAuth},{new:true})
    
    res.json({    
        categoria
      })
  }


module.exports={
    obtenerCategorias,
    crearCategoria,
    obtenerCategoriaId,
    actualizarCategoria,
    eliminarCategoria
}