import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { loginThunk, signupThunk } from '../store/user/user.thunk'
import { toast } from 'react-toastify'

let loginQuote = 'Your vibe, your tribe — all in one place'
let signupQuote = 'Sign up to see photos and videos from your friends.'

function LoginSignupPage() {
   const dispatch= useDispatch()
  const navigate= useNavigate()
  const [signupState, setSignupState] = useState(false)
 const [loginForm, setLoginForm] = useState({
      email:'macep70765@nicext.com',
      password:'',
      username:''
    })



  const handleSubmit = e => {
    e.preventDefault()
    if(signupState){ 
  
      
      dispatch(signupThunk(loginForm)).then(res=>{
          if(res.meta.rejectedWithValue){
            toast.error(res.payload.message)
          }
   
                  
          else if(res.payload.status==201){
            toast.success(res.payload.message)
          }
          else{
            toast.error('internal server error')
          }
      })
    }else{
      
      dispatch(loginThunk(loginForm)).then(res=> {
        console.log(res);
        if(res.meta.rejectedWithValue){
          toast.error(res.payload.message)
        }
        else if(res.payload.status==200){
          toast.success('Login Successful')
         localStorage.setItem('accessToken',res.payload.data.accessToken)
          
          navigate('/')
        }
        else{
          toast.error('internal server error')
        }
        
      })
    }
    
  }
  const onValueChange= (e)=>{
    const {id, value} = e.target
    setLoginForm(prevForm=>({ ...prevForm,[id]:value}))
    
  }


  return (
    <div className="flex min-h-screen bg-base-200" data-theme="night">
   
      <div className="hidden md:flex md:w-1/2 items-center justify-center  p-30">
    <img
  src="/login.png"
  alt="Login"
  className="object-cover h-full w-full hover:scale-105 transition-transform duration-300"
/>

      </div>

      
      <div className="flex flex-col md:w-1/2 pt-20 px-10 max-w-lg mx-auto ">
        <div className="mb-8 flex justify-center">
          <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
        </div>

        <p className="text-center text-lg font-semibold mb-6">
          {signupState ? signupQuote : loginQuote}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {signupState && (
            <input 
            id='username'
            onChange={(e)=>onValueChange(e)}
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
            />
          )}
          <input 
          id='email'
          // onChange={(e)=>onValueChange(e)}
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            // required
          />
          <input 
          id='password'
           onChange={(e)=>onValueChange(e)}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          {signupState && (
            <>
              <p className="text-xs text-gray-300">
                People who use our service may have uploaded your contact information to Instagram.{' '}
                <span className="underline cursor-pointer">Learn More</span>
              </p>
              <p className="text-xs text-gray-300">
                By signing up, you agree to our{' '}
                <span className="underline cursor-pointer">Terms</span>,{' '}
                <span className="underline cursor-pointer">Privacy Policy</span> and{' '}
                <span className="underline cursor-pointer">Cookies Policy</span>.
              </p>
            </>
          )}

          <button type="submit" className="btn btn-primary mt-4">
            {signupState ? "Signup" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <h3 className="mb-2 text-gray-400">{signupState ? 'Have An Account?' : "Create an Account"}</h3>
          <button
            onClick={() => setSignupState(!signupState)}
            className="btn btn-ghost btn-sm text-primary underline"
          >
            {signupState ? 'Log In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginSignupPage
