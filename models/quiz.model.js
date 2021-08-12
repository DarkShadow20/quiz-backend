const mongoose=require('mongoose');
const quizDatabase = require("./quiz.data");


const optionSchema=mongoose.Schema({
  text:{
    type:String,
    required:"Option is required"
  },
  isRight:{
    type:Boolean,
    required:"isRight is required"
  }
})

const questionSchema=mongoose.Schema({
  question:{
    type:String,
    required:"Question is Required"
  },
  points:{
    type:Number,
    required:"Marks are required"
  },
  negativePoints:{
    type:Number,
    required:"Marks are required"
  },
  options:[optionSchema]
})

const quizSchema=mongoose.Schema({
  genre:{
    type:String,
    required:"Genre is required"
  },
  description:{
    type:String,
    required:"Description is required"
  },
  image:{
    type:String,
    required:"Image is required"
  },
  questions:[questionSchema]
})

const Quiz = mongoose.model('Quiz', quizSchema);

const fillQuizCollection= async ()=> {
  try {
    quizDatabase.forEach(async (item) => {
      const newQuiz = new Quiz(item);
      const savedQuiz = await newQuiz.save();
      console.log(savedQuiz);
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = { Quiz, fillQuizCollection };