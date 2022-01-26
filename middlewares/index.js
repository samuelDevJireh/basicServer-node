

const  validarCampos  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const  isAdminRol  = require('../middlewares/validar-rol');
const  validarFile = require('../middlewares/validar-archivo');


module.exports={
    ...validarCampos,
    ...validarJWT,
    ...isAdminRol,
    ...validarFile
}