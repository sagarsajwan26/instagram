# Instagram Clone Server

A full-stack web application backend for an Instagram-like social platform. This project provides RESTful APIs for user authentication, posting media, commenting, liking, and more. It is built with Node.js, Express, MongoDB, and supports file uploads, JWT authentication, and email verification.

---

## Table of Contents

- [Description](#description)
- [Installation Instructions](#installation-instructions)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Error Handling & Validation](#error-handling--validation)
- [Security](#security)
- [Performance & Optimization](#performance--optimization)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact / Support](#contact--support)

---

## Description

This project is the backend server for an Instagram clone. It allows users to sign up, verify their email, log in, upload images/videos, create posts, comment, like/unlike posts, and follow/unfollow other users. The server handles authentication, file uploads, and real-time features using Socket.io.

---

## Installation Instructions

### Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (Atlas or local instance)
- **Cloudinary** account (for media uploads)
- **Gmail** account (for email verification)

### Steps

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/instagram-clone-server.git
   cd instagram-clone-server/server
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `server` folder with the following content:

   ```env
   PORT=5000
   MONGO_DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password
   JWT_EMAIL_SECRET=your_email_jwt_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_KEY=your_cloudinary_api_key
   CLOUD_SECRET=your_cloudinary_api_secret
   ```

4. **Run the server**
   ```sh
   npm run server
   ```
   Or for production:
   ```sh
   npm start
   ```

---

## Usage

### Starting the Application

- The server runs on `http://localhost:5000` by default.
- Use Postman or any HTTP client to interact with the API.

### Core Features Example

- **User Signup:**  
  `POST /api/v1/users/userSignup`  
  Body: `{ "username": "john", "email": "john@example.com", "password": "123456" }`

- **Email Verification:**  
  Click the link sent to your email.

- **Login:**  
  `POST /api/v1/users/userLogin`  
  Body: `{ "email": "john@example.com", "password": "123456" }`

- **Create Post:**  
  `POST /api/v1/post/addPost`  
  (multipart/form-data with images/videos)

- **Like Post:**  
  `PUT /api/v1/post/likePost/:id`

- **Comment:**  
  `POST /api/v1/comment/addComment/:id`

### Front-End

If you have a front-end, follow its README for setup. This server exposes REST APIs for any client.

---

## Folder Structure

```
server/
│
├── api/                # Entry point for server
│   └── server.js
├── public/             # Static files and uploaded media
│   └── multer/
├── src/
│   ├── app.js          # Express app setup
│   ├── socket.js       # Socket.io setup
│   ├── controllers/    # Route controllers
│   ├── db/             # Database connection
│   ├── middleware/     # Auth, multer, etc.
│   ├── model/          # Mongoose models
│   ├── routes/         # API route definitions
│   └── utils/          # Utility functions (Cloudinary, nodemailer, etc.)
├── .env                # Environment variables
├── package.json        # Project metadata and scripts
└── vercel.json         # Deployment config (Vercel)
```

---

## API Documentation

### User Routes

- `POST /api/v1/users/userSignup`  
  Signup new user.

- `GET /api/v1/users/verifyEmail/:token`  
  Verify user email.

- `POST /api/v1/users/userLogin`  
  Login user.

- `POST /api/v1/users/logout`  
  Logout user.

### Post Routes

- `POST /api/v1/post/addPost`  
  Create a new post (multipart/form-data).

- `PUT /api/v1/post/updatePost/:id`  
  Update a post.

- `DELETE /api/v1/post/deletePost/:id`  
  Delete a post.

- `GET /api/v1/post/getUserPost`  
  Get posts by logged-in user.

- `PUT /api/v1/post/likePost/:id`  
  Like/unlike a post.

- `GET /api/v1/post/getAllPosts`  
  Get all posts (paginated).

### Comment Routes

- `POST /api/v1/comment/addComment/:id`  
  Add a comment to a post.

- `PUT /api/v1/comment/updateComment/:id`  
  Edit a comment.

- `DELETE /api/v1/comment/deleteComment/:id`  
  Delete a comment.

- `GET /api/v1/comment/getComments/:id`  
  Get comments for a post (paginated).

#### Example Response

```json
{
  "status": 200,
  "message": "user logged in successfully",
  "data": {
    "username": "john",
    "email": "john@example.com",
    "avatarUrl": "",
    "bio": ""
  },
  "success": true
}
```

---

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose)
- **Socket.io**
- **Cloudinary** (media uploads)
- **Multer** (file uploads)
- **JWT** (authentication)
- **Nodemailer** (email verification)
- **dotenv** (environment variables)
- **Vercel** (deployment)

---

## Features

- User authentication (signup, login, logout)
- Email verification
- JWT-based session management
- Profile update and avatar upload
- Create, update, delete posts (with images/videos)
- Like/unlike posts
- Comment on posts (CRUD)
- Follow/unfollow users
- Pagination for posts and comments
- Real-time features (Socket.io ready)
- Secure file uploads to Cloudinary

---

## Error Handling & Validation

- All endpoints validate required fields and types.
- Consistent HTTP status codes (`400`, `401`, `403`, `404`, `409`, `500`).
- Errors are returned in JSON format with clear messages.
- Uses async error handler middleware for catching exceptions.

---

## Security

- Passwords hashed with bcrypt before storing.
- JWT authentication for protected routes.
- Email verification required before login.
- Input validation for all user data.
- CORS enabled and configured.
- Cookies set as `httpOnly` and `sameSite: strict`.

---

## Performance & Optimization

- Pagination for posts and comments.
- MongoDB indexes for faster queries.
- Uses `.lean()` for read-only queries to improve performance.
- Efficient file handling and cleanup after uploads.

---

## Testing

- You can add unit and integration tests using Jest or Mocha.
- To run tests (if implemented):
  ```sh
  npm test
  ```
- (Add your test strategy here if you have tests.)

---

## Deployment

- Ready for deployment on Vercel (see `vercel.json`).
- Set environment variables in your deployment platform.
- For other platforms (Heroku, Render, etc.), use their environment variable setup.

---

## Contributing

- Fork the repository and create a new branch for your feature or bugfix.
- Submit a pull request with a clear description.
- Follow code style and add comments where necessary.
- Please open issues for bugs or feature requests.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact / Support

- For questions or support, open an issue on GitHub.
- You can also reach the maintainer at: `your.email@example.com`

---

**Happy Coding! 🚀**