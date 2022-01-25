
const {Schema , model, SchemaTypes}= require('mongoose');

const CategoriaSchema=Schema({
    nombre:{
        type:String,
        required:[true,'el nombre es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        required:true,
        default:true
    },
    usuario:{
        type:SchemaTypes.ObjectId,
        ref:'Usuario',
        required:true,
    }
});


CategoriaSchema.methods.toJSON=function () {
    const{__v,estado,...categoria}= this.toObject();
    //categoria.uid=_id;
    return categoria;
  }

module.exports= model('Categoria',CategoriaSchema);