const {Router}=require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete } = require('../controllers/user');
const { isValidRol, emailexist, isValidId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router= Router();

 //get
 router.get('/', userGet);
//put ,con los dospuntos seguido del identificaor del parametro recibimos este
router.put('/:id',[
  check('id','no es un Idvalido').isMongoId(),
  check('id',).custom(isValidId),
  check('rol').custom(isValidRol),
  validarCampos
], userPut);
  //post
router.post('/', 
[//middlewares
  check('nombre','El nombre es necesario').notEmpty(),
  check('correo','email es necesario').notEmpty(),
  check('correo','email invalido').isEmail(),
  check('correo').custom(emailexist),
  check('password','contraseña invalida').notEmpty(),
  check('password','La contraseña debe contener al menos 6 caracteres').isLength({min:6}),
  //check('rol','No es un Rol valido').isIn(['ADMIN','USER','SUPER_ADMIN']),
  check('rol').custom(isValidRol),
  validarCampos
],userPost);
  //delete
router.delete('/:id',[
  check('id','no es un Idvalido').isMongoId(),
  check('id',).custom(isValidId),//valida que exista el id
  validarCampos
],userDelete);


module.exports=router;