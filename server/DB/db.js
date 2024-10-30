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
    published:Boolean,
    courseAdmin:String
  })
  
const user_schema=new mongoose.Schema({
       //The username field is defined with an object that contains the key type. This object syntax allows for additional configuration options, such as setting default values, adding validation, making the field required, or adding other constraints like unique.
  
       //Use the object syntax ({ type: String }) when you need to configure additional options for the field.
  
    username:{type:String},
    password:String,
  
    //ObjectId is a special data type used by MongoDB to uniquely identify documents within a collection. It is commonly used to reference documents from other collections.
    purchased_courses:[{type:mongoose.Schema.Types.ObjectId,ref:'Courses'}]
  })
  

  // if an object(course) is referenced in multiple places(users) in mongoDB and if main object(course) is deleted, how to make sure all referenced also deleted 
  // Pre-remove middleware to handle cascading delete
  
  //NOT SOLVED
// course_schema.pre('remove', async function (next) {
//   const courseId = this._id;

//   // Remove references to the deleted course from the User collection
//   await mongoose.model('user').updateMany(
//     { purchased_courses: courseId },
//     { $pull: { purchased_courses: courseId } }
//   );

//   next();
// });

//for storing videos information in DB
const video_schema=new mongoose.Schema({
  title:String,
  description:String,
  filePath:String,
  fileName:String,
  videoCourseId:String
})

//for storing comments
const comments_schema=new mongoose.Schema({
  commentUsername:String,
  commentBody:String,
  commentCourseId:String
})

//schema to model
const admin=mongoose.model('Admin',admin_schema);
//see now in mongodb compass Admin collection created
const course=mongoose.model('Courses',course_schema);
//see now in mongodb compass Courses collection created
const user=mongoose.model('User',user_schema);
const video=mongoose.model('Videos',video_schema);
const comment=mongoose.model('Comments',comments_schema);

module.exports={
    user,course,admin,video,comment
}