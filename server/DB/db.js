const mongoose=require('mongoose');

//defining schema
const admin_schema=new mongoose.Schema({
    username:String,
    password:String
  })
  
const course_schema=new mongoose.Schema({
    title: String, 
    description:String, 
    price: String, 
    imageLink:String,
    published:Boolean
  })
  
const user_schema=new mongoose.Schema({
       //The username field is defined with an object that contains the key type. This object syntax allows for additional configuration options, such as setting default values, adding validation, making the field required, or adding other constraints like unique.
  
       //Use the object syntax ({ type: String }) when you need to configure additional options for the field.
  
    username:{type:String},
    password:String,
  
    //ObjectId is a special data type used by MongoDB to uniquely identify documents within a collection. It is commonly used to reference documents from other collections.
    purchased_courses:[{type:mongoose.Schema.Types.ObjectId,ref:'Courses'}]
  })
  
//schema to model
const admin=mongoose.model('Admin',admin_schema);
//see now in mongodb compass Admin collection created
const course=mongoose.model('Courses',course_schema);
//see now in mongodb compass Courses collection created
const user=mongoose.model('User',user_schema);

module.exports={
    user,course,admin
}