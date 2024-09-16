const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const adminRouter=require('./routes/admin');
const userRouter=require('./routes/user');

//for env
require('dotenv').config();
const app=express();

app.use(cors());
app.use(express.json());

app.use("/admin",adminRouter);
app.use("/users",userRouter);

//connect database
mongoose.connect(process.env.MONGO_URL);


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });