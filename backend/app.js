import dotenv from 'dotenv'
dotenv.config();
import express, { json } from "express"
import cors from 'cors'
import morgan from 'morgan';



const app = express();


//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send("Hello to Uber webapp")
})


export default app;