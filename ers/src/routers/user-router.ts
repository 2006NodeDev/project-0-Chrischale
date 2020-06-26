import express, { Request, Response, NextFunction } from 'express'
import { User } from '../models/Users'
import { authMware } from '../middleware/auth-middleware'

export const uRouter = express.Router()

// Get all
uRouter.get('/', authMware(['Admin']), (req:Request,res:Response,next:NextFunction)=>{
    res.json(user_arr)
})

//Find Users
uRouter.get('/users', authMware(['Finance Manager']), (req:Request, res:Response) => {
    let req_param = req.body
    for (const u of user_arr){
        if (req_param == u){
            res.send(u)
        }
    }
    
})


//Find User by id
uRouter.get('/:id', authMware(['Finance Manager']), (req:Request, res:Response)=>{
    let req_id = req.params
    if(isNaN(+req_id)){
        res.status(400).send('ID must be numeric')
    } else {
        let found = false
        for(const user of user_arr){
            if(user.userId === +req_id){
                res.send(user)
                found = true
            }
        }
        if(!found){
            res.status(404).send('User doesnt exist')
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