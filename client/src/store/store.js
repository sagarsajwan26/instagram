import { configureStore } from "@reduxjs/toolkit";
import userSlice from './user/user.slice'
import postSlice from './post/post.slice'
import commentSlice from './comment/comment.slice'
export const store= configureStore({
    reducer:{
        user:userSlice,
        post:postSlice,
        comment:commentSlice
    }
})