const foodModel=require('../model/foodModel')
const fsPromises=require('fs').promises
const path=require('path')

const addFood=async(req,res)=>{
    let image_filename=`${req.file.filename}`

    try {
        const food=await foodModel.create({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:image_filename

        })
        res.json({success:true,message:"food added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error adding food"})
    }
}
    const listFood=async(req,res)=>{
        try {
            const foods= await foodModel.find()
            res.status(200).json({success:true,data:foods})
        } catch (error) {
            console.log(error)
            res.status(500).json({success:false,message:"error in fetching foods"})
        }
    }

    const removeFood = async (req, res) => {
        try {
          const { id } = req.query; // Retrieve the food ID from the query
          console.log(id);
      
          // Find the food item by ID
          const food = await foodModel.findById(id);
          if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
          }
      
          // Delete the associated image file
          await fsPromises.unlink(path.join(__dirname, '..', 'uploads', `${food.image}`));
      
          // Delete the food item from the database
          await foodModel.deleteOne({ _id: id }); // Use _id to match the document
      
          res.status(200).json({ success: true, message: "Food deleted successfully" });
        } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, message: "Error in deleting food" });
        }
      };
      

module.exports={addFood,listFood,removeFood}