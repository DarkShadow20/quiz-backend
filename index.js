const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./db/db.connect");

const app=express();
const port=4000;
app.use(cors());
app.use(bodyParser.json());

connectDB();

//middlewares
const errorHandler=require("./middlewares/errorHandler");
const routeHandler=require("./middlewares/routeHandler");

//routes
const userRouter=require("./routes/users.router")
const quizRouter=require("./routes/quiz.router.js")
const scoreboardRoutes = require('./routes/scoreboard.router.js');

app.use("/users",userRouter)
app.use("/quiz",quizRouter)
app.use('/score', scoreboardRoutes);

app.get("/", (req, res) => {
  res.send("API for NEOQUIZ");
});

app.use(routeHandler);
app.use(errorHandler);

app.listen(port,()=>{
  console.log(`App started on ${port}!`);
})