import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  media: {
    type: [{
      mediaUrl: { type: String, required: true, trim: true },
      mediaType: { type: String, enum: ["video", "image"], required: true }
    }],
    validate: [arr => arr.length > 0, "At least one media item required"]
  },

  caption: {
    type: String,
    required: true,
    trim: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default:[]
  }],

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default:[]
  }],

}, {
  timestamps: true
});
postSchema.index({caption:"text"})

postSchema.index({ userId: 1, createdAt: -1 });

export const Post = mongoose.model("Post", postSchema);
