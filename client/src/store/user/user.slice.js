import { createSlice } from "@reduxjs/toolkit"
import { loginThunk, signupThunk } from "./user.thunk"

const initialState={
    isAuthenticated:false,
    userData:null
}


const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

builder.addCase(loginThunk.pending,(state,action)=>{
state.isAuthenticated= false
})
builder.addCase(loginThunk.fulfilled,(state,action)=>{
if(action.payload.status==200){
    state.isAuthenticated= true
    state.userData= action.payload.data.userData
}
})
builder.addCase(loginThunk.rejected,(state,action)=>{
state.isAuthenticated=false 


})
builder.addCase(signupThunk.pending,(state,action)=>{

})
builder.addCase(signupThunk.fulfilled,(state,action)=>{

})
builder.addCase(signupThunk.rejected,(state,action)=>{

})



    }



})

export const {} = userSlice.actions
export default userSlice.reducer