const jwt = require('jsonwebtoken');


const generarJWT= (uid='') => {
    return new Promise((res,rej)=>{

        const payload={uid};

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:"20 days"
            
        },(err,token)=>{
            if (err) {
                console.log(err);
                rej('no se pudo generar token');
            }else{
                res(token);
            }
        })

    });

}
module.exports={
    generarJWT
}