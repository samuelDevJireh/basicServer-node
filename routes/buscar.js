const {Router}=require('express');
const { check } = require('express-validator');
const { buscar } = require('../controllers/buscar');
const { validarCampos } = require('../middlewares/validar-campos');

const router= Router();

router.get('/:collection/:termino',buscar);



module.exports=router;