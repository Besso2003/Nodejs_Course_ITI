
import userModel from "../../Database/Models/User.Model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// signup  --> email,passw, age, name 

let signup = async (req, res) => {
    let addUser = await userModel.insertMany(req.body);
    addUser[0].password = undefined
    res.json({message: "User Added", data: addUser})
}


let signin = async (req, res) => {
    // let foundUser = await userModel.findOne({email: req.body.email})
    // console.log(req.foundUser)
    let foundUser = req.foundUser // from database 
    let matchPassword = bcrypt.compareSync(req.body.password, foundUser.password)
    if(matchPassword){
        // create token
        let token = jwt.sign({_id: foundUser._id, role: foundUser.role, email: foundUser.email}, "iti")
       return res.json({message: "Welcome", data: foundUser, token: token})
    }
    // }else{
        res.status(422).json({message: "Invalid Password or Email"})
    // }

}


export { signup, signin}