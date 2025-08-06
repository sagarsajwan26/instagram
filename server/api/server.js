import 'dotenv/config';
import { connectDB } from '../src/db/db.js';
// import { app } from '../src/socket.js';
import '../src/app.js';
import { server } from '../src/socket.js';
// import serverless from 'serverless-http';
const port = process.env.PORT || 5000;

connectDB().then(()=>{
    server.listen(port, ()=>{
        console.log('server is listening on port',port);
        
    })
}).catch(err => console.log('Error connecting to DB', err));

// export default serverless(app);