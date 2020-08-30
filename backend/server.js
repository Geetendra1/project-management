import express from "express"  
import data from './data'
import dotenv from 'dotenv'
import config from './config'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRoute from './routes/userRoute'
import projectRoute from './routes/projectRoute';
import taskRoute from './routes/taskRoute';
const cookieParser = require('cookie-parser')
import uploadRoute from './routes/uploadRoute';
import path from 'path';
dotenv.config();

const mongodbURL = config.MONGODB_URL;
mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).catch(error => console.log(error.reason))

const app = express() 
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/api/users", userRoute)
app.use('/api/projects', projectRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/uploads', uploadRoute);
app.get("/api/config/paypal", (req,res) => {
    res.send(config.PAYPAL_CLIENT_ID);
})
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.listen(5000, () => { console.log("server is running at port http://localhost:5000");})