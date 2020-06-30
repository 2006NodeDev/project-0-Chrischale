import express, { Request, Response, NextFunction } from 'express'
//import { Reimbursement } from '../models/Reimbursement'
import { ReimbIncompleteError } from '../errors/ReimbIncompleteError'
import {authenticationMiddleware} from '../middleware/authent-middleware'
import { authorizationMiddleware } from '../middleware/authoriz-middleware'
import { getStatusById, getStatusByUser, submitNewReimb } from '../dao/reimb-dao'
import { Reimbursement } from '../models/Reimbursement'
//import session from 'express-session'



export const rRouter = express.Router()
rRouter.use(authenticationMiddleware)

//Find reimbursement by status
rRouter.get('/status/:statusId', authorizationMiddleware(['Finance Manager']), async(req:Request, res:Response, next:NextFunction) => {

    let req_statusId = req.params.statusId
    
    if (isNaN(+req_statusId)){
        res.send("Status ID must be a number")
    } else {
        try{
            let result = await getStatusById(+req_statusId)
            res.json(result)
        } catch (err) {
            next(err)

        }
       
    }
})




//Find Reimb by User
rRouter.get('/author/userId/:userId', authorizationMiddleware(['Finance Manager']), async (req:Request, res:Response, next:NextFunction) =>{
    let req_userId = req.params.userId

    
    if (isNaN(+req_userId)){
        res.send("Status ID must be a number")
    } else {
        try{
            let result = await getStatusByUser(+req_userId)
            res.json(result)
        } catch (err) {
            next(err)

        }
       
    }

})



//Submit Reimbursement
rRouter.post('/', async (req:Request, res:Response, next:NextFunction) => {
    let {author, amount, dateResolved, description, resolver, status, type} = req.body
    if(!author || !amount || !description || !status || !type){
        //ensure all that must be not null, are filled
        next(new ReimbIncompleteError)

    } else {
        
        let newReimb: Reimbursement = {
            reimbursementId: 0,
            author,
            amount,
            dateSubmitted: Date.now(),
            dateResolved,
            description,
            resolver,
            status,
            type
        }
        //new users default to User role

        try{
            if (isNaN(amount) || isNaN(status) || isNaN (type)){
                throw new Error ('Please enter numbers for amount, status and type')
            } else {
                let savedReimb = await submitNewReimb(newReimb)
                res.sendStatus(201).json(savedReimb)

            }
            
        } catch (err) {
            next (err)
        }
        
    }

})



//Update Reimbursement
rRouter.patch('/', authorizationMiddleware(['Finance Manager']), (req:Request, res:Response) => {
//The reimbursementId must be presen as well as all fields to update, 
//any field left undefined will not be updated. This can be used to approve and deny.





})




//dummy data:

// export let reimb_arr:Reimbursement[] = [
//     {
//         reimbursementId: 1,
//         author: 2,
//         amount: 300,
//         dateSubmitted: 23,
//         dateResolved: 43,
//         description: "blah1",
//         resolver: 5,
//         status: 9,
//         type: 2 
//     },
//     {
//         reimbursementId: 2,
//         author: 4,
//         amount: 7700,
//         dateSubmitted: 1468959781804,
//         dateResolved: 1469199218634,
//         description: "blah2",
//         resolver: 2,
//         status: 3,
//         type: 3 
//     },
//     {
//         reimbursementId: 3,
//         author: 17,
//         amount: 50,
//         dateSubmitted: 1468959781804,
//         dateResolved: 1469199218650,
//         description: "blah3",
//         resolver: 5,
//         status: 2,
//         type: 1 
//     }
// ]