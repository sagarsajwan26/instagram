import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
comment:{
    type:String,
    required:true
},
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
postId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post",
    required:true
}                              
},{timestamps:true})
commentSchema.index({comment:'text'})
commentSchema.index({userId:1,createdAt:-1})
commentSchema.index({postId:1,createdAt:-1})

export const Comment= mongoose.model('Comment',commentSchema)