import express, { Request, Response, NextFunction } from 'express'
//import { Reimbursement } from '../models/Reimbursement'
import { ReimbIncompleteError } from '../errors/ReimbIncompleteError'
import {authenticationMiddleware} from '../middleware/authent-middleware'
import { authorizationMiddleware } from '../middleware/authoriz-middleware'
import { getStatusById, getStatusByUser } from '../dao/reimb-dao'



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
rRouter.post('/', (req:Request, res:Response) => {
    
    let {r_author, r_amount} = req.body
    //let day = new Date

    //date_to_insert = day.getDate

    if (!r_author || !r_amount ) {
        throw new ReimbIncompleteError()
    }
    

    //add new_reimb to the db

    
})


//Update Reimbursement
rRouter.patch('/', authorizationMiddleware(['Finance Manager']), (req:Request, res:Response) => {

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