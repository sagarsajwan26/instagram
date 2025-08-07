import jwt from 'jsonwebtoken'

export const userAuth= async(req,res,next)=>{
    const token = req?.cookies?.accessToken || req?.headers?.authorization.split(' ')[1]
        if(!token) return res.status(401).json({message:"access token is missing"})

    try {
        const user= await jwt.verify(token,process.env.JWT_SECRET)
        if(!user)return res.status(404).json({message:"user not found"})
        req.user= user
            return next() 
        
    } catch (error) {
        console.log('error while verifying token',error.message);
        
    }

}