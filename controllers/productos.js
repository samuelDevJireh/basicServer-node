const { response, request } = require("express");
const { Categoria,Producto } = require("../models");


//obterner catergorias - paginado - total -populate
const obtenerProductos= async(req= request,res=response) => {

    const {limite=10,desde=0,min=0,max=200}= req.query;

    try {
        // ejecuta varias promesas al mismo tiempo
    const [total,productos] = await Promise.all([
        Producto.countDocuments({estado:true}),
        Producto.find({estado:true})
               .populate('usuario','nombre')
               .populate('categoria','nombre')
               .where('precio').lt(max+1).gt(min-1)
               .skip(desde)
               .limit(limite)
      ]);

    res.json({
        total,
        productos
     });
    } catch (error) {
        console.log(error);
        throw('error al obtener productos');
    }
    
}

// obtener producto - populate
const obtenerProductoId=async(req= request, res=response) => {

    const {id}= req.params;
    const producto=await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre');

    res.json({  
        producto
     });
}


const crearProducto= async( req=request, res=response) => {
     
    const {estado,usuario,...body}=req.body;
    //validamos que el producto no se repita
    const productoDb=await Producto.findOne({ nombre: body.nombre });
    if (productoDb) {
       return res.status(400).json({
            errors:[{msg:`El producto: ${body.nombre} ya existe`}]
           });
    }
    //generar data a guardar
    body.nombre=body.nombre.toUpperCase();    
    const data={
        
        ...body,
        usuario:req.userAuth._id //viene del validador del jwt
    }
    //guardar en db
    const producto= await new Producto(data);
    await producto.save();

    res.json({
        producto
     });
}

const actualizarProducto=async(req= request, res=response) => {

    const id= req.params.id;
    const {estado,usuario,...data}=req.body;
     
    if (data.nombre) {
        data.nombre=data.nombre.toUpperCase();
    }
    data.usuario=req.userAuth._id;
try {
    //validamos que el nombre del producto no exista ya
    const existeNombre= await Producto.findOne({nombre:data.nombre})
    // const categoria=await Categoria.findById(id);
   
     if (existeNombre && existeNombre.id !== id) {
         return res.status(400).json({
          errors:[{msg:`El producto: ${existeNombre.nombre} ya esta registrado`}]
         });
     }
       
      const productoActualizado= await Producto.findByIdAndUpdate(id,data,{new:true});
  
      res.json({  
         productoActualizado
       });
    
} catch (error) {
    console.log(error);
    res.status(400).json({
        errors:[error],
       });
}
  
}

// eliminar categoria
const eliminarProducto =async (req, res = response)=> {

    const idreq= req.params.id;
    //const uid= req.uid;
    const userAuth= req.userAuth._id;

    try {
        //const usuario=await Usuario.findByIdAndDelete(idreq);
    const producto=await Producto.findByIdAndUpdate(idreq,{estado:false,usuario:userAuth},{new:true})
    
    res.json({    
      producto
      });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            errors:[error]
           });
    }
    
  }

module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProductoId,
    actualizarProducto,
    eliminarProducto

}