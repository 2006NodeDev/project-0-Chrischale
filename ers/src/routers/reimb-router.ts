import express, { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'
import { ReimbursementStatus } from './models/ReimbursementStatus'
import { ReimbType } from './models/ReimbType'
import { Reimbursement } from './models/Reimbursement'
//???????????/

import { authMware } from '../middleware/auth-middleware'

export const rRouter = express.Router()

//Find reimbursement by status
rRouter.get('/reimbursements/status/:statusId', authMware(['Finance Manager']), (res:Response, req:Request) => {
    let req_Status = req.params

    //passing in the status namenot ID! match it to ReimbursementStatus.ts

    



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
    }
]