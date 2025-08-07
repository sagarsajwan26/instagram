import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

export const addPost = createAsyncThunk(
  '/user/addPost',
  async (data, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken')

    try {
      const res = await axiosInstance.post('/post/addPost', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,

          'Content-Type': 'multipart/form-data',
        },
      })
      return res.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  },
)


export const getUserPosts= createAsyncThunk('/user/getUserPosts',async()=>{
  const token = localStorage.getItem('accessToken') 
  try {
    const res= await axiosInstance.get('/post/getUserPost',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return res.data
  } catch (error) {
    console.log(error);
    
  }
})

export const getAllPosts= createAsyncThunk('/user/getAllPosts',async()=>{
  const token = localStorage.getItem('accessToken')
  try {
    const res= await axiosInstance.get('/post/getAllPosts',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return res.data
  } catch (error) {
    console.log(error);

  }
})