 
const express = require('express');
var cors = require('cors');



 class Server{

    constructor(){
        this.app= express();
        this.port=process.env.PORT
        this.usuariosRoutePath='/api/usuarios';

        //middlewares funciones que añaden funciones al servidor
        this.middlewares();
        

        //rustas de app
        this.routes();
    }

    middlewares(){
        this.app.use(cors())
        //parseo y lectura del json
        this.app.use(express.json());
        //directorio pulico
        this.app.use(express.static('public'));
    }


    routes(){
       this.app.use(this.usuariosRoutePath,require('../routes/user'));
    }


    lister(){
        this.app.listen(this.port,()=>{
            console.log('servidor en puerto', this.port);
        })
    }

 }


 module.exports= Server;