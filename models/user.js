
const {Schema , model}= require('mongoose');


const UsuarioSchema=Schema({
    nombre:{
      type:String,
      required:[true,'El nombre es obligatorio'],
    },
    correo:{
      type:String,
      required:[true,'El email es obligatorio'],
      unique:true,
    },
    password:{
      type:String,
      required:[true,'La contraseña es obligatoria'],
    },
    img:{
      type:String,
    },
    rol:{
      type:String,
      required:true,
      enum:['ADMIN','USER','SUPER_ADMIN']
    },
    estado:{
        type:Boolean,
        default:true
      },
    google:{
        type:Boolean,
        default:false
      },
    
});

UsuarioSchema.methods.toJSON=function () {
  const{__v,password,...usuario}= this.toObject();
  return usuario;
}

module.exports= model('Usuario',UsuarioSchema);
//el model exporta nuestro esquema 
//debemod e ponerle un nombre en singular ya que mongoose por defecto le agrega una s al final 
//del nombre ,este tambien definira el nombre de nuestra colleccion