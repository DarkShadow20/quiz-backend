const {Quiz}=require("../models/quiz.model");

const getQuiz=async(req,res)=>{
  try{
    let quiz=await Quiz.find({})
    res.status(200).json({success:true , quiz})
  }catch(err){
    console.log(err.message)
    res.status(500).json({
      success:false,
      message:"Unable to get Quiz list",
      errMessage:err.message
    })
  }
}

module.exports={
  getQuiz
};