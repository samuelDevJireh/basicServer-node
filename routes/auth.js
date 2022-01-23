const {Router}=require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailLogin } = require('../helpers/db-validators');

const { login, googleSingIn } = require('../controllers/auth');

const router= Router();

router.post('/login',[
    check('correo','el correo no es obligatorio').notEmpty(),
    check('correo','el correo no es valido').isEmail(),
    //check('correo').custom(emailLogin),
    check('password','contraseña invalida').notEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('id_token','Id Token de google necesario').notEmpty(),
    validarCampos
],googleSingIn);


module.exports=router;