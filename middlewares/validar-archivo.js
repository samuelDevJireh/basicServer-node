const { response } = require("express")


const validarFileUp =(req,res=response,next) => {
        
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({msg:'No hay archivos en la peticion'});
        return;
      }
      if (!req.files.archivo) {
        res.status(400).json({msg:'No hay archivos en la peticion'});
        return;
      }

      next();
    }

module.exports={
    validarFileUp
}