const {Router}=require('express');
const { check } = require('express-validator');
const { loadFiles, actualizarImagen, obtenerImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos,validarFileUp} = require('../middlewares');

const router= Router();

router.post('/',loadFiles)

router.put('/:collection/:id',[
    check('id','No es un id valido').isMongoId(),
    validarFileUp,
    check('collection').custom(c => coleccionesPermitidas(c,['usuarios','categorias','productos'])),
    validarCampos],actualizarImagenCloudinary)


router.get('/:collection/:id',[
    check('id','No es un id valido').isMongoId(),
    check('collection').custom(c => coleccionesPermitidas(c,['usuarios','categorias','productos'])),
    validarCampos],obtenerImagen)


module.exports=router;