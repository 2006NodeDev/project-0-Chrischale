import express, { Request, Response, NextFunction } from 'express'
import { authorizationMiddleware } from '../middleware/authoriz-middleware'
import {authenticationMiddleware} from '../middleware/authent-middleware'
import { getAllUsers, findUserbyID } from '../dao/users-dao'
import { UserIdIncorrectError } from '../errors/UserIdIncorrectErr'
//import { UserNotFoundError } from '../errors/UserNotFoundErr'
//import { BadCredError } from '../errors/Bad CredentialsErr'


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
// uRouter.patch('/', authorizationMiddleware(['Admin']), async (req:Request, res:Response, next:NextFunction) => {
//     let upd_user = req.body

//     if (isNaN(upd_user.userId)){
//         throw new BadCredError

//     }else{
//         try{
//             let ret_user = await updateUser(upd_user)
//             res.json(ret_user)
//         }catch (err){
//             next(err)
    
//         }
       
//     }
// })









