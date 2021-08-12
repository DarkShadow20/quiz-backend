const express=require('express');
const router=express.Router();
const {getQuiz}=require("../controllers/quiz.controller");


router.route('/').get(getQuiz);


module.exports=router