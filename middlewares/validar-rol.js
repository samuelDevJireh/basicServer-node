const { request, response } = require("express")

const isAdminRol= (req= response,res= request,next) => {


    if (!req.userAuth) {
        return res.status(500).json({
            errors:[{msg:'se quiere verificar rol sin validar token'}]
           }); 
    }

    const {rol,nombre}= req.userAuth;

    if (rol !== 'ADMIN') {
        return res.status(401).json({
            errors:[{msg:'Se requiere permiso de administrador'}]
           }); 
    }
    next();
}

const validarRol= (...roles) => {

   
    return (req = requests,res= response,next)=>{

        if (!req.userAuth) {
            return res.status(500).json({
                errors:[{msg:'se quiere verificar rol sin validar token'}]
               }); 
        }

        const user= req.userAuth;
        if (!roles.includes(user.rol)) {
            return res.status(401).json({
                errors:[{msg:'Usuario sin rol definido'}]
               }); 
        }
        next()
       
    }

}

module.exports={
    isAdminRol,
    validarRol
}