const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema(
    {
      userId:{
          type: String,
          required: true,
      },
      desc :{
          type: String,
          required: true,
      },
      image :{
          type: String,
          required: true,
      },
      video :{
          type: String,
      },
      likes:[],
      /*
    comments:[{
        user :{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        fullName:{
            type: String,
            required: true,
        },
        comment:{
            type: String,
            required: true,
        },
    }]
  */
      
    },
    {timestamps:true}
  );
  
  const Posts = mongoose.model("post", postSchema, "post");
  module.exports = Posts;
  
