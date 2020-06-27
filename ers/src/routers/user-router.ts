import express, { Request, Response } from 'express'
import { User } from '../models/Users'
import { authorizationMiddleware } from '../middleware/authoriz-middleware'
import { UserNotFoundError } from '../errors/UserNotFoundErr'
import { UserIdIncorrectError } from '../errors/UserIdIncorrectErr'

export const uRouter = express.Router()

// // Get all
// uRouter.get('/', authMware(['Admin']), (req:Request,res:Response,next:NextFunction)=>{
//     res.json(user_arr)
// })

//Find Users
uRouter.get('/', authorizationMiddleware(['Finance Manager']), (req:Request, res:Response) => {
    res.send(user_arr)
    
})


//Find User by id
uRouter.get('/:id', (req:Request, res:Response)=>{
    let req_id = req.params.id
    
    if(isNaN(+req_id)){
        throw new UserIdIncorrectError()
    } else {
        let found = false
        for(const user of user_arr){
            if(user.userId === +req_id){
                res.send(user)
                found = true
            }
        }
        if(!found){
            throw new UserNotFoundError()
        }
    }
})


//Update User
uRouter.patch('/users', authorizationMiddleware(['Admin']), (req:Request, res:Response) => {
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




//dummy data:
export let user_arr:User[] = [
    {
        userId: 1, 
        username: 'chrischale', // not null, unique
        password: 'password1', // not null
        firstName: 'Chrischale', // not null
        lastName: 'Pand', // not null
        email: 'chrischale@gmail.com', // not null
        rolename: {roleID: 1, role: 'Trainee'}, // not null
    },
    {
        userId: 2, 
        username: 'Alec', // not null, unique
        password: 'password2', // not null
        firstName: 'Alec', // not null
        lastName: 'Batson', // not null
        email: 'abatson@gmail.com', // not null
        rolename: {roleID: 2, role: 'Finance Manager'} // not null
    },
    {
        userId: 3, 
        username: 'bob', // not null, unique
        password: 'password3', // not null
        firstName: 'Bob', // not null
        lastName: 'Builder', // not null
        email: 'bobb@gmail.com', // not null
        rolename: {roleID: 3, role: 'Admin'}, // not null
    }
]