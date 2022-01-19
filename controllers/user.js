const {response,request}= require('express');

const userGet = (req=request, res = response)=> {

    //http://localhost:8080/api/usuarios?name=Samuel&apell=santiago
    const paramsquery=req.query;
    //tambien podriamos desestruturarlos y manejar valores definidos por si no vienen
    //const {name,apellido='santiago'}= req.query;
    res.json({
        //ok:true,
        msg:'Get Api controllador',
    paramsquery})
  }

const userPost = (req, res = response)=> {
    //optenemos lo que viene en el requets
    const body= req.body;
    const{nombre,id}= req.body; //desestructuracion de json
    
    res.json({
        //ok:true,
        msg:'Post Api controllador',
        body,
        id
    })
  }

const userPut = (req, res = response)=> {

    //para recibir parametro en segmentos tenemos wue definirlos en la ruta
    //y reciperarlos con params
    const id= req.params.id;
    
    res.json({
        //ok:true,
        msg:'Put Api controllador',
        id
    })
  }

const userDelete = (req, res = response)=> {
    
    res.json({
        //ok:true,
        msg:'Delete Api controllador'})
  }



module.exports={
    userGet,
    userPost,
    userPut,
    userDelete
}