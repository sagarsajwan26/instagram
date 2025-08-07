import { createSlice } from "@reduxjs/toolkit"
import { getAllPosts, getUserPosts } from "./post.thunk"

const initialState={
    loginUserPosts:[],
    allPosts:null
    
}
const postSlice= createSlice({

    name:"post",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUserPosts.fulfilled,(state,action)=>{
            // console.log(action.payload);
            state.loginUserPosts= action.payload.data
            
        })
        builder.addCase(getAllPosts.fulfilled, (state,action)=>{
            // console.log(action.payload);
            state.allPosts= action.payload.data
        })
    }



})
export const {} = postSlice.actions
export default postSlice.reducer