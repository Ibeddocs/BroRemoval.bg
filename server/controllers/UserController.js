import { Svix, Webhook } from "svix"
import userModel from "../models/userModel.js"


// API Controller Function to clerk user width database
//  http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req,res) => {

    try {

        // create a svix

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })

        const {data, type} = req.body

        switch (type) {
            case "user.created":{
                
                const userData ={
                    clerkId: data.id,
                    email: data.email_address[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }

                await userModel.create(userData)
                res.json({})

                break;

        }
                
        case "user.update":{

            const userData ={
                email: data.email_address[0].email_address,
                firstName: data.first_name,
                lastName: data.last_name,
                photo: data.image_url
            }

            await userModel.findByIdAndUpdate({clerkId:data.id},userData)
            res.json({})

            break;

        }

         case "user.deleted":{
            await userModel.findByIdAndDelete({clerkId:data.id})
            res.json({})

            break;

        }   
        
            default:
                break;
        }



    } catch (error) {
            console.log(error.message)
            res.json({success:false, message:error.message})
    }

}





// api controllers  credits data
const useCredits = async (req,res) => {
    try {

        const { clerkId } = req.body

        const userData = await userModel.findOne({clerkId})

        req.json({success:true, credits:userData.creditBalance})

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }

} 





export {clerkWebhooks, useCredits}
