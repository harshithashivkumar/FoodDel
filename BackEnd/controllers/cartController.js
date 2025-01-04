const userModel = require('../model/userModel');

const addToCart = async (req, res) => {
    try{
        let userData=await userModel.findById(req.body.userId)
        let cartData=userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }else{
            cartData[req.body.itemId]+=1
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.status(200).json({success: true, message: "Item added to cart successfully"})
    }catch(err){
        res.status(500).json({success: false, message: "Something went wrong"})
    }
}
const getCart = async (req, res) => {
    try{
        let userData=await userModel.findById(req.body.userId)
        let cartData=userData.cartData;
        res.status(200).json({success: true, data: cartData})
    }catch(err){
        console.log(err).json({success: false, message: "Internal Server Error"})
    }

}
const removeFromCart = async (req, res) => {
    try{
        let userData=await userModel.findById(req.body.userId)
        let cartData=userData.cartData;
        if(cartData[req.body.itemId]){
            cartData[req.body.itemId]-=1
    }
    await userModel.findByIdAndUpdate(req.body.userId, {cartData})
    res.status(200).json({success: true, message: "Item removed from cart successfully"})
    }catch(err){
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}


module.exports = {
    addToCart,
    getCart,
    removeFromCart
}