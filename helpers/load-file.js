
const path= require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo=(files,extensionesValidas=['png','jpeg','jpg','gif'],carpeta='') => {

    return new Promise((resolve,reject)=>{

     // if(!files)return reject(`no hay un archivo para guardar`);
        const {archivo} = files;
        const nombrecortado= archivo.name.split('.')
    
        const extension=nombrecortado[nombrecortado.length -1]
        //validar ectension
        
        if(!extensionesValidas.includes(extension)) return reject(`La extension ${extension} no es permitida`);
       // console.log(extension);
    
        const nombreFinal=uuidv4()+'.'+extension;
        const uploadPath = path.join( __dirname , '../uploads/',carpeta , nombreFinal);
      
        archivo.mv(uploadPath, function(err) {
          if (err) {
            return reject(err);
          }
      
          //resolve('File uploaded to ' + uploadPath);
          resolve(nombreFinal);
        });

    }) 
}

module.exports={
    subirArchivo
}