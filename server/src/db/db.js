import mongoose from 'mongoose'

export const connectDB= async()=>{
        try {
            const instance = await mongoose.connect(process.env.MONGO_DB_URI)
            console.log('MONGO DB SUCCESSFULLY CONNCECTED AT', instance.connections[0].host);
            
            
        } catch (error) {
            console.log('ERROR WHILE CONNECTING TO MONGODB',error.message);
            
        }
}