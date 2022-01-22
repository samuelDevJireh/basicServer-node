const {Router}=require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailLogin } = require('../helpers/db-validators');

const { login } = require('../controllers/auth');

const router= Router();

router.post('/login',[
    check('correo','el correo no es obligatorio').notEmpty(),
    check('correo','el correo no es valido').isEmail(),
    //check('correo').custom(emailLogin),
    check('password','contraseña invalida').notEmpty(),
    validarCampos
],login);


module.exports=router;