const bycrypt= require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require("../models/user.model");
const secret = process.env['secret']
const getUsers=async(req,res)=>{
  try{
    let users=await User.find({})
    users=users.map((user)=>{
      user.password=undefined;
      return user;
    })
    res.json({success:true , users})
  }catch(err){
    console.log(err.message)
    res.status(500).json({
      success:false,
      message:"Unable to get Users list",
      errMessage:err.message
    })
  }
}

const findUser=async(req,res)=>{
  const {email,password}=req.body;
  const token=req.headers.authorization;
  const userExists=await User.exists({email})
  const userInfo=await User.findOne({email})
  if(token){
    const decoded=jwt.verify(token,secret)
    if(userInfo._id==decoded.userId){
    let matchPassword= await bycrypt.compare(password,userInfo.password)
    if(matchPassword){
      return res.status(201).json({success:true});
    }else{
     return res.status(401).json({
        success:false,
        message:"Username and password does not match"
      })
    }
  }
  else{
    return res.status(401).json({
      success:false,
      message:"Username does not exist"
    })
  }
  }
  else{
    if(userInfo){
      let matchPassword= await bycrypt.compare(password,userInfo.password)
      if(matchPassword){
        const token=jwt.sign({userId: userInfo._id},secret)
        return res.status(201).json({success:true,token});
      }
      else{
        return res.status(401).json({
          success:false,
          message:"Username or Password is wrong"
        })
      }
    }else{
      return res.status(401).json({
          success:false,
          message:"Username or Password is wrong"
        })
    }
  }
}

const addUser=async(req,res)=>{
  try{
    const userData=req.body
    const emailExists=await User.exists({email:userData.email})
    if(emailExists){
      res.status(401).json({
        success:false,
        message:"Email already exists"
        })
        return emailExists;
    }
    const salt = await bycrypt.genSalt(10);
    userData.password= await bycrypt.hash(userData.password,salt)
    let newUser=new User(userData);
    await newUser.save();
    const token=jwt.sign({userId: newUser._id},secret)
    const user={_id:newUser._id,name:newUser.name,token:token}
    res.status(201).json({success:true,user})
  }catch(err){
    res.status(500).json({
      success:false,
      message:"Could not add the user.Try Again!",
      errMessage:err.message
    })
  }
};

module.exports={
  getUsers,
  findUser,
  addUser
};