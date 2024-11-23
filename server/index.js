const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const adminRouter=require('./routes/admin');
const userRouter=require('./routes/user');
//for env
require('dotenv').config();
const app=express();
const bodyParser=require('body-parser')

app.use(cors());
app.use(express.json());



//parse multi-form data to json-for videos form data
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/admin",adminRouter);
app.use("/user",userRouter);

//connect database
mongoose.connect(
  "mongodb+srv://ecommerceMern:user123@cluster0.sommd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

// app.listen(process.env.PORT||5000, () => {
//     console.log('Server is listening on port'+process.env.PORT);
//   });
app.listen(3000,()=>{
  console.log('server running')
})


app.get("/",(req,res)=>{
  res.send("Express App is running")
})