import express, { Request, Response } from 'express'
//import { authorizationMiddleware } from '../middleware/authoriz-middleware'
import { Reimbursement } from '../models/Reimbursement'

export const rRouter = express.Router()

//Find reimbursement by status
rRouter.get('/status/:statusId', (res:Response, req:Request) => {

    let req_statusId = req.params
    console.log(req.params)
    
    if (isNaN(+req_statusId)){
        res.send("Status ID must be a number")
    } else {
        let found = false
        for (const r of reimb_arr){
            if (+req_statusId === r.status){
                found = true
                res.send(r)
            }
        }
        
        if (!found){
            res.sendStatus(404)
        }
    }
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