const {Router}=require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProductoId, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const { validarCampos, validarJWT, isAdminRol } = require('../middlewares');

const router= Router();

//obtener todas las categorias publico
router.get('/',obtenerProductos);
//obtener categoria por id
router.get('/:id',[
    validarJWT,
    check('id','no es un Id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],obtenerProductoId);
//crear una nueva categoria private con rol
router.post('/',[
    validarJWT,
    check('nombre','El nombre es requerido').notEmpty(),
    check('categoria','No es una categoria valida').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],
crearProducto);
// //actualizar categoria -privado con token
router.put('/:id',[
    validarJWT,
    check('id','no es un Id valido').isMongoId(),
    check('categoria','No es una categoria valida').isMongoId(),
    check('id').custom(existeProducto),
    check('categoria').custom(existeCategoria),
    validarCampos
],actualizarProducto);
// //borrar categoria -admin
router.delete('/:id',[
  validarJWT,
  isAdminRol,
  check('id','no es un Idvalido').isMongoId(),
  check('id',).custom(existeProducto),//valida que exista el id
  validarCampos
],eliminarProducto);

module.exports=router;