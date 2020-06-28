import express, { Request, Response } from 'express'
//import { User } from '../models/Users'
import { authorizationMiddleware } from '../middleware/authoriz-middleware'
import {authenticationMiddleware} from '../middleware/authent-middleware'
import { UserNotFoundError } from '../errors/UserNotFoundErr'
import { UserIdIncorrectError } from '../errors/UserIdIncorrectErr'
import { getAllUsers } from '../dao/users-dao'

export const uRouter = express.Router()

uRouter.use(authenticationMiddleware)


//Find Users
uRouter.get('/', authorizationMiddleware(['Finance Manager']), async (req:Request, res:Response) => {
    let user_return = await getAllUsers()
    res.json(user_return)
    
})


//Find User by id
uRouter.get('/:id', authorizationMiddleware(['Finance Manager']), async (req:Request, res:Response)=>{
    let req_id = req.params.id
    console.log(req_id)
    
    if(isNaN(+req_id)){
        throw new UserIdIncorrectError()
    } else {
        let found = false
        let user_arr = await getAllUsers()
        for(const user of user_arr){
            if(user.userId === +req_id){
                res.json(user)
                found = true
            }
        }
        if(!found){
            throw new UserNotFoundError()
        }
    }
})


//Update User
uRouter.patch('/', authorizationMiddleware(['Admin']), (req:Request, res:Response) => {
    let res_user = req.body
    if (isNaN(res_user.userId)){
        res.status(400).send('Please provide ID')
    }else{
       // let upd_user = user_arr.find(u => u.userId === res_user.userId)

        for (let prop of res_user){
            //if field is undefined then skip update
            if (prop == undefined){
                continue
            }// }else{
            //     upd_user.
            // }
        }
    }
})


