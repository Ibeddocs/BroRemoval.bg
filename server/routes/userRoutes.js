import express from 'express'
import { clerkWebhooks, useCredits } from '../controllers/UserController.js'
import authUser from '../middlewares/auth.js'


const userRoutes = express.Router()

userRoutes.post('/webhooks', clerkWebhooks)
userRoutes.get('/credits',authUser, useCredits)

export default userRoutes