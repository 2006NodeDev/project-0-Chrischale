import express, { Request, Response } from 'express'
import { Reimbursement } from '../models/Reimbursement'
import { UserIdIncorrectError } from '../errors/UserIdIncorrectErr'
import { ReimbNotFoundError } from '../errors/ReimbNotFoundError'
import { ReimbIncompleteError } from '../errors/ReimbIncompleteError'
import {authenticationMiddleware} from '../middleware/authent-middleware'
import { authorizationMiddleware } from '../middleware/authoriz-middleware'
//import { getAllReimbursements } from '../dao/reimb-dao'



export const rRouter = express.Router()
rRouter.use(authenticationMiddleware)

//Find reimbursement by status
rRouter.get('/status/:statusId', authorizationMiddleware(['Finance Manager']), (res:Response, req:Request) => {

    let req_statusId = req.params
    console.log(req.params)
    
    if (isNaN(+req_statusId)){
        res.send("Status ID must be a number")
    } else {
        let found = false
       // let reimb_arr = await getAllReimbursements()
        for (const r of reimb_arr){
            if (+req_statusId === r.status){
                found = true
                res.json(r)
            }
        }
        
        if (!found){
            res.sendStatus(404)
        }
    }
})




//Find Reimb by User
rRouter.get('/author/userId/:userId', authorizationMiddleware(['Finance Manager']), (res:Response, req:Request) =>{
    let req_userID = req.params

    if(isNaN(+req_userID)){
        throw new UserIdIncorrectError()
    }else{
        let found = false
        //let reimb_arr = await getAllReimbursements()
        for (let r of reimb_arr){
            if (r.author === +req_userID){
                found = true
                res.json(r)
            }
        }
        if(!found){
            throw new ReimbNotFoundError()
        }
    }

})



//Submit Reimbursement
rRouter.post('/', (res:Response, req:Request) => {
    
    let {r_author, r_amount} = req.body
    //let day = new Date

    if (!r_author || !r_amount ) {
        throw new ReimbIncompleteError()
    }
    

    //add new_reimb to the db

    
})


//Update Reimbursement
rRouter.patch('/', authorizationMiddleware(['Finance Manager']), (res:Response, req:Request) => {

})




//dummy data:

export let reimb_arr:Reimbursement[] = [
    {
        reimbursementId: 1,
        author: 2,
        amount: 300,
        dateSubmitted: 23,
        dateResolved: 43,
        description: "blah1",
        resolver: 5,
        status: 9,
        type: 2 
    },
    {
        reimbursementId: 2,
        author: 4,
        amount: 7700,
        dateSubmitted: 1468959781804,
        dateResolved: 1469199218634,
        description: "blah2",
        resolver: 2,
        status: 3,
        type: 3 
    },
    {
        reimbursementId: 3,
        author: 17,
        amount: 50,
        dateSubmitted: 1468959781804,
        dateResolved: 1469199218650,
        description: "blah3",
        resolver: 5,
        status: 2,
        type: 1 
    }
]