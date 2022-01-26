
const dbValidator=require('./db-validators');
const generarJwt=require('./generateJWT');
const googleverify=require('./google-verify');
const loadFiles=require('./load-file');

module.exports={
    ...dbValidator,
    ...generarJwt,
    ...googleverify,
    ...loadFiles
}