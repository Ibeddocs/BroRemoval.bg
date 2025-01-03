import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import connectDB from './configs/MongoDB.js'
import imageRouter from './routes/imageRoutes.js'




//  App Config
const PORT = process.env.PORT || 3000
const app = express()
await connectDB()

// Intialize Middlew 
app.use(express.json())
app.use(cors())

// API routes
app.get('/',(req,res)=> res.send("API Working") )
app.use('/api/user',userRoutes)
app.use('/api/image',imageRouter)

app.listen(PORT, () => console.log("Server Running On Port"+PORT))