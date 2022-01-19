const {Router}=require('express');
const { userGet, userPut, userPost, userDelete } = require('../controllers/user');

const router= Router();

 //get
 router.get('/', userGet);
//put ,con los dospuntos seguido del identificaor del parametro recibimos este
router.put('/:id', userPut);
  //post
router.post('/', userPost);
  //delete
router.delete('/',userDelete);


module.exports=router;