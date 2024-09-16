const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const adminRouter=require('./routes/admin');
const userRouter=require('./routes/user');

const app=express();

app.use(cors());
app.use(express.json());

app.use("/admin",adminRouter);
app.use("/users",userRouter);

//connect database
mongoose.connect('mongodb+srv://ompbabhinav2:U3BrGYnZiKnaUDs3@cluster0.3pz91ie.mongodb.net/course_selling_app')


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });