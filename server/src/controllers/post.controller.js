import { Post } from "../model/post.model.js";
import { User } from "../model/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadToCloudinary } from "../utils/Cloudinary.js";

export const addPost = asyncHandler(async (req, res) => {
  const { caption } = req.body;
  const posts = req.files;

  if (!caption?.trim())
    return res.status(400).json({ message: "Fields cannot be empty" });
  if (!posts || posts.length <= 0)
    return res.status(400).json({ message: "Posts cannot be empty" });

  let uploadedposts = await Promise.all(
    posts.map(async (item) => await uploadToCloudinary(item.buffer, item.originalname))
  );

  const media = uploadedposts.map((item) => ({
    mediaUrl: item?.secure_url,
    mediaType: item?.resource_type,
  }));

  const newPost = await Post.create({
    caption,
    media,
    userId: req.user.id,
  });

  await User.findByIdAndUpdate(req.user.id, {
    $push: { posts: newPost._id },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Posted successfully", newPost));
});

export const updatePost = asyncHandler(async (req, res) => {
  const {  caption } = req.body;
  const { id: postId } = req.params;

  if (!postId)
    return res.status(400).json({ message: "Post ID is missing" });

  if (  !caption?.trim())
    return res.status(400).json({ message: "Fields cannot be empty" });

  const updatedPost = await Post.findOneAndUpdate(
    { _id: postId, userId: req.user.id },
    { caption },
    { new: true }
  );

  if (!updatedPost)
    return res.status(404).json({ message: "Post not found or you are not authorized" });

  return res
    .status(200)
    .json(new ApiResponse(200, "Post updated successfully", updatedPost));
});

export const deletePost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  if (!postId)
    return res.status(400).json({ message: "Post ID is missing" });

  const deletePost = await Post.findOneAndDelete({
    _id: postId,
    userId: req.user.id,
  });

  if (!deletePost)
    return res.status(404).json({ message: "Post not found or you are not authorized" });

  await User.findByIdAndUpdate(req.user.id, {
    $pull: { posts: postId },
  });

  return res
    .status(200)
    .json({ message: "Your post has been deleted successfully" });
});

export const getUserPosts = asyncHandler(async (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);

  const posts = await Post.find({ userId: req.user.id })
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 })
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, "Posts fetched successfully", posts));
});

export const likePost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  if (!postId)
    return res.status(400).json({ message: "Post ID is missing" });

  const userId = req.user.id;

  let updatedPost = await Post.findOneAndUpdate(
    { _id: postId, likes: userId },
    { $pull: { likes: userId } },
    { new: true }
  );

  let message = "Post removed from like";

  if (!updatedPost) {
    updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
    message = "Post liked";
  }

  if (!updatedPost)
    return res.status(404).json({ message: "Post not found" });

  return res
    .status(200)
    .json(new ApiResponse(200, message, updatedPost));
});

export const getAllPosts = asyncHandler(async (req, res) => {
  const rawSkip = parseInt(req.query.skip);
  const skip = Number.isNaN(rawSkip) || rawSkip < 0 ? 0 : rawSkip;

  const rawLimit = parseInt(req.query.limit);
  const limit = Number.isNaN(rawLimit) || rawLimit <= 0 ? 10 : Math.min(rawLimit, 100);

  const posts = await Post.find({})
    .populate("userId", "username")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, "Posts fetched", posts));
});