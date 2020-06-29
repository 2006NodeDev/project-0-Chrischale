import express, { Request, Response, NextFunction } from 'express'
//import { User } from '../models/Users'
import { authorizationMiddleware } from '../middleware/authoriz-middleware'
import {authenticationMiddleware} from '../middleware/authent-middleware'
import { getAllUsers, findUserbyID } from '../dao/users-dao'
import { UserIdIncorrectError } from '../errors/UserIdIncorrectErr'

export const uRouter = express.Router()

uRouter.use(authenticationMiddleware)


//Find Users
uRouter.get('/', authorizationMiddleware(['Finance Manager']), async (req:Request, res:Response, next:NextFunction) => {

    try{

        let user_return = await getAllUsers()
        res.json(user_return)
    
    } catch (err) {
        next(err)

    } 
    
})


//Find User by id
uRouter.get('/:id', authorizationMiddleware(['Finance Manager']), async (req:Request, res:Response, next:NextFunction)=>{
    let req_id = req.params.id
    //console.log(req_id)
    if (isNaN(+req_id)){
        next (UserIdIncorrectError)
    } else {
        try{
            let ret_user = await findUserbyID(+req_id)
            res.json(ret_user)
        }catch (err){
            next(err)
    
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


