import { User } from "../model/user.model.js";
import { VerifyEmail } from "../model/verifyEmail.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadToCloudinary } from "../utils/Cloudinary.js";
import { transporter } from "../utils/nodemailer.js";
import jwt from 'jsonwebtoken'


const generateAccessToken = async (id) => {
  if (!id) throw new Error("user id is missing");
  const user = await User.findById(id);
  if (!user) throw new Error("user does not exist");
  return user.generateAccessToken();
};



export const userSignup = asyncHandler(async (req, res) => {
  console.log(req.body);
  
  const { username, email, password, bio } = req.body;

  if (!username.trim() || !email.trim() || !password.trim())
    return res.status(400).json({ message: "fields are required" });

  const checkemailAndusername = await User.findOne({
    $or: [{ email }, { username }]
  });
  if (checkemailAndusername)
    return res.status(409).json({ message: "user with same email or username already exist" });

  const newUser = await User.create({
    username,
    email,
    password,
    bio: bio?.trim() ? bio : "",
  });

  const verifyEmailToken = jwt.sign(
    { id: newUser._id, email: newUser.email },
    process.env.JWT_EMAIL_SECRET
  );

  await VerifyEmail.create({
    token: verifyEmailToken,
    user: newUser._id
  });

  const verifyLink = `http://localhost:5000/api/v1/users/verifyEmail/${verifyEmailToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: newUser.email,
    subject: "Verify email",
    text: `Click on the link to verify your email ${verifyLink}`,
    html: `<p>Click on the link to verify your email <a href="${verifyLink}">Verify Email</a></p>`
  };

  await transporter.sendMail(mailOptions);

  return res.status(201).json(new ApiResponse(201, 'account has been created successfully please verify your email to Login Link will expire in 10 Min'));
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token: verifyEmailToken } = req.params;
  if (!verifyEmailToken)
    return res.status(400).json({ message: "token is required" });

  const verifyEmail = await VerifyEmail.findOne({ token: verifyEmailToken }).lean();
  if (!verifyEmail)
    return res.status(404).json({ message: 'email verification failed' });

  await Promise.all([
    User.findByIdAndUpdate(verifyEmail.user, { isEmailVerified: true }, { new: true }),
    VerifyEmail.findByIdAndDelete(verifyEmail._id)
  ]);
  return res.status(200).json({ message: 'email verification successful' });
});

export const userLogin = asyncHandler(async (req, res) => {
    console.log(req.body);

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "fields are required" });

  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser)
    return res.status(404).json({ message: "user does not exist" });
  if (!existingUser.isEmailVerified)
    return res.status(403).json({ message: "verify your email first" });

  const validatePassword = await existingUser.verifyPassword(password);
  if (!validatePassword)
    return res.status(401).json({ message: "invalid credentials" });

  const accessToken = await generateAccessToken(existingUser._id);

  const { password: pwd, ...userData } = existingUser.toObject();
  return res
    .status(200)
    .cookie("accessToken", accessToken, { httpOnly: true, sameSite: "strict" })
    .json(new ApiResponse(200, "user logged in successfully", {userData,accessToken}));
});

export const logout = asyncHandler(async (req, res) => {
  req.user = null;

  return res.status(200)
    .clearCookie('accessToken', { httpOnly: true, sameSite: "strict" })
    .json(new ApiResponse(200, 'user logged out successfully'));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { username, bio } = req.body;
  if (!username.trim())
    return res.status(400).json({ message: "username cannot be empty" });

  const updateUser = await User.findByIdAndUpdate(req.user.id, {
    username,
    bio: bio.trim() ? bio : ""
  }, { new: true });

  return res.status(200).json(new ApiResponse(200, 'user details updated', updateUser));
});

export const updateProfilePic = asyncHandler(async (req, res) => {
  const avatar = req.file;
  if (!avatar)
    return res.status(400).json({ message: "profile pic is required" });

  const pic = await uploadToCloudinary(avatar.buffer, avatar.originalname);
  if (!pic)
    return res.status(500).json({ message: "upload failed" });

  const updatePic = await User.findByIdAndUpdate(req.user.id, {
    avatarUrl: pic.secure_url
  }, { new: true });

  return res.status(200).json(new ApiResponse(200, 'profile pic updated successfully', updatePic));
});

export const followUnfollowUser = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  if (!userId)
    return res.status(400).json({ message: "user id is missing" });

  const [loggedInUser, targetUser] = await Promise.all([
    User.findById(req.user.id),
    User.findById(userId)
  ]);
  if (!loggedInUser || !targetUser)
    return res.status(404).json({ message: "user not found" });

  const ifFollowing = loggedInUser.following.includes(targetUser._id);

  const ops = ifFollowing ?
    [
      User.findByIdAndUpdate(req.user.id, { $pull: { following: userId } }),
      User.findByIdAndUpdate(userId, { $pull: { followers: req.user.id } })
    ] : [
      User.findByIdAndUpdate(req.user.id, { $addToSet: { following: userId } }),
      User.findByIdAndUpdate(userId, { $addToSet: { followers: req.user.id } })
    ];

  await Promise.all(ops);

  return res.status(200).json(new ApiResponse(200, ifFollowing ? "unfollowed" : "following"));
});