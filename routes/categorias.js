const {Router}=require('express');
const { check } = require('express-validator');
const { obtenerCategorias, crearCategoria, obtenerCategoriaId, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { validarCampos, validarJWT, isAdminRol } = require('../middlewares');

const router= Router();
//obtener todas las categorias publico
router.get('/',obtenerCategorias);
//obtener categoria por id
router.get('/:id',[
    check('id','no es un Idvalido').isMongoId(),
    check('id').custom(existeCategoria),
    //validarJWT,
    validarCampos
],obtenerCategoriaId);
//crear una nueva categoria private con rol
router.post('/',[
    validarJWT,
    check('nombre','la categoria debe tener algun nombre !!').notEmpty(),
    validarCampos
],
crearCategoria);
//actualizar categoria -privado con token
router.put('/:id',[
    validarJWT,
    check('id','no es un Idvalido').isMongoId(),
    check('nombre','la categoria debe tener algun nombre !!').notEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);
//borrar categoria -admin
router.delete('/:id',[
  validarJWT,
  isAdminRol,
  check('id','no es un Idvalido').isMongoId(),
  check('id',).custom(existeCategoria),//valida que exista el id
  validarCampos
],eliminarCategoria);

module.exports=router;