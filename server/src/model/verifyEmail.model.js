import mongoose,{Schema} from "mongoose";
const verifyEmailSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 
    }
});

export const VerifyEmail = mongoose.model('VerifyEmail', verifyEmailSchema);