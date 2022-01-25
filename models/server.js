 
const express = require('express');
var cors = require('cors');
const { dbConecctions } = require('../db/config');



 class Server{

    constructor(){
        this.app= express();
        this.port=process.env.PORT
        this.path={
            usuariosRoute:'/api/usuarios',
            authRoute:'/api/auth',
            categoriasRoute:'/api/categorias',
            productoRoute:'/api/productos',
            buscarRoute:'/api/buscar'
        }
        this.usuariosRoutePath='/api/usuarios';
        this.authRoutePath='/api/auth';
        //conectar database
        this.conectarBaseDatos();

        //middlewares funciones que añaden funciones al servidor
        this.middlewares();
        
        //rustas de app
        this.routes();
    }

    async conectarBaseDatos() {
        //en esta area podriamos hacer multiples conexiones a base de datos
        await dbConecctions();
    }

    middlewares(){
        this.app.use(cors())
        //parseo y lectura del json
        this.app.use(express.json());
        //directorio pulico
        this.app.use(express.static('public'));
    }


    routes(){
       this.app.use(this.authRoutePath,require('../routes/auth'));
       this.app.use(this.usuariosRoutePath,require('../routes/user'));
       this.app.use(this.path.categoriasRoute,require('../routes/categorias'));
       this.app.use(this.path.productoRoute,require('../routes/productos'));
       this.app.use(this.path.buscarRoute,require('../routes/buscar'));
    }


    lister(){
        this.app.listen(this.port,()=>{
            console.log('servidor en puerto', this.port);
        })
    }

 }


 module.exports= Server;