import { asyncHandler } from "../utils/AsyncHandler.js";
import { Post } from '../model/post.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../model/comment.model.js";

export const addComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  if (!comment?.trim()) return res.status(400).json({ message: "Comment cannot be empty" });
  const { id: postId } = req.params;
  if (!postId) return res.status(400).json({ message: "Post ID is missing" });

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: "Post not found or has been deleted" });

  const newComment = await Comment.create({
    comment,
    userId: req.user.id,
    postId
  });

  await Post.findByIdAndUpdate(postId, {
    $push: { comments: newComment._id }
  });

  return res.status(201).json(new ApiResponse(201, 'Comment added successfully', { newComment, post }));
});

export const editComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const { id: commentId } = req.params;
  if (!comment?.trim()) return res.status(400).json({ message: "Comment cannot be empty" });
  if (!commentId) return res.status(400).json({ message: "Comment ID is missing" });

  const updateComment = await Comment.findOneAndUpdate(
    { _id: commentId, userId: req.user.id },
    { comment },
    { new: true }
  );
  if (!updateComment) return res.status(403).json({ message: 'Comment not found or you are not authorized' });

  return res.status(200).json(new ApiResponse(200, 'Comment updated successfully', updateComment));
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { id: commentId } = req.params;
  if (!commentId) return res.status(400).json({ message: "Comment ID is missing" });

  const comment = await Comment.findOneAndDelete({ _id: commentId, userId: req.user.id });
  if (!comment) return res.status(403).json({ message: "Comment not found or you are not authorized" });

  if (comment.postId) {
    await Post.findByIdAndUpdate(comment.postId, { $pull: { comments: commentId } });
  }

  return res.status(200).json(new ApiResponse(200, 'Comment deleted successfully', comment));
});

export const getComments = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  const skip = parseInt(req.query.skip) || 0;
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: "Post not found or has been deleted" });

  const comments = await Comment.find({ postId }).skip(skip).limit(limit).sort({ createdAt: -1 }).lean();
  const count = await Comment.countDocuments({ postId });

  return res.status(200).json(new ApiResponse(200, "Comments fetched", { comments, count }));
});