const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const connectDatabase = require("./utils/db");
app.use(cors());
app.use(express.json());
// import routes
const auth = require('./router/auth-router');
const category = require('./router/category-router');
const question = require('./router/question-router');
const assessment = require('./router/assessment-router')
const test = require('./router/test-router');
const answer = require('./router/answer-router')
const candidate = require("./router/candidate-router")
const attempted = require("./router/attempted-assesment-router")

app.use('/api/v1',auth);
app.use('/api/v1',category);
app.use('/api/v2',question);
app.use('/api/v3',assessment);
app.use('/api/v3',test);
app.use('/api/v3',answer);
app.use('/api/v3',candidate);
app.use('/api/v3',attempted);







// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  })
dotenv.config({path:"./utils/config.env"});
connectDatabase();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
// MiddleWare for error
// // unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);
  server.close(()=>{
    process.exit(1);
  })
  })