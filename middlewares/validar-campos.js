
const { validationResult } = require('express-validator');

const validarCampos= (req,res,next) => {
    //obtenemos los errores que nos envien los middlewares
    const errors=validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    //si llega aqui seguira ejecutando codigo
    next();
}

module.exports={
    validarCampos
}