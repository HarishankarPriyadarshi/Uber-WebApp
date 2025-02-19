import dotenv from 'dotenv'
dotenv.config();
import express, { json } from "express"
import cors from 'cors'
import morgan from 'morgan';
import connectToDb from './db/db.js';
connectToDb()
import userRoutes from "./routes/user.routes.js"
import cookieParser from 'cookie-parser';

const app = express();


//middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Hello to Uber webapp")
})

// routes defined here
app.use('/users', userRoutes)


export default app;