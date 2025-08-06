import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select:false },
  bio:      { type: String, default: '' },
  avatarUrl:{ type: String, default: '' },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Posts',default:[] }],
  isEmailVerified:{
type:Boolean,
    default:false
  },
  followers:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  following:[{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

userSchema.index({ email: 1, username: 1 }, { unique: true });



userSchema.pre('save', async function(next) { 
  if (!this.isModified('password')) return next(); 
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});


userSchema.methods.verifyPassword= async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id,
        email:this.email,
        username:this.username,
        avatarUrl:this.avatarUrl,
        bio:this.bio,

     },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};



export const User= mongoose.model('User', userSchema)