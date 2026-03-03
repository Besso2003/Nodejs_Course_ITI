
import userModel from "../Database/Models/User.Model.js";

const checkEmail = async (req,res,next) =>{
    console.log(req.url);
    let foundUser = await userModel.findOne({email: req.body.email})

    if(req.url == "/signup"){
        if(foundUser){
          return res.status(409).json({message: "User Already Exists"})
        }
        next();
    }else{
        if(foundUser){
            req.foundUser = foundUser
            next();
        }else{
            return res.status(422).json({message: "Invalid Password or Email"})
        }
    }
}

export default checkEmail