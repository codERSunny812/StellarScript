const userModel = require("../models/user.model");
const { validationResult } = require('express-validator')


exports.signUp = async(req,res)=>{
try {
    // to display the result of the express valdiation result 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password,fullName} = req.body;

    console.log(email,password,fullName)

    const user =  await userModel.findOne({email:email});

    // check the existence of the user in the database
    if(user){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        })
    }

    // hashing the password before storing into the db
    const hashedPassword = await userModel.hashedPassword(password);


    // creating the user 
    const newUser = new userModel({
        email:email,
        password:hashedPassword,
        fullName:fullName
    });


    return res.status(200).json({
        success:true,
        message:"User created successfully",
        data:await newUser.save()
    })




  
    
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
}
}


exports.login=async(req,res)=>{ 
    try {
        // check for the error through express-validator
        const errors = validationResult(req)

        // found error
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const {email,password} = req.body;

        const user = await userModel.findOne({email:email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        // compare the password
        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Login successfull"
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}