
const mongoose = require('mongoose');

//conexcion base de datos
const dbConecctions=async() => {
  try {

   await mongoose.connect(process.env.MONGODB_CNN )
  

    console.log('Bd online');
      
  } catch (error) {
      console.log(error);
      throw new Error ('error al establecer conexion con la base de datos');
  }
}

module.exports={
    dbConecctions
}