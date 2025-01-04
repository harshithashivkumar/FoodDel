const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await 
        mongoose.connect(process.env.DATABASE_URI).then(()=>{
        console.log("Connected to MongoDB");
    })
}catch(err){
      console.log(err.message);
}
}

module.exports = connectDB;