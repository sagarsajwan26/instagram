import { createSlice } from "@reduxjs/toolkit"
import { getUserPosts } from "./post.thunk"

const initialState={
    loginUserPosts:[],
    
}
const postSlice= createSlice({

    name:"post",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUserPosts.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.loginUserPosts= action.payload.data
            
        })
    }

})
export const {} = postSlice.actions
export default postSlice.reducer