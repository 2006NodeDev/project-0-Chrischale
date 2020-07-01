import express, { Request, Response, NextFunction, request } from 'express'
//import { Reimbursement } from '../models/Reimbursement'
import { ReimbIncompleteError } from '../errors/ReimbIncompleteError'
import {authenticationMiddleware} from '../middleware/authent-middleware'
import { authorizationMiddleware } from '../middleware/authoriz-middleware'
import { getStatusById, getStatusByUser, submitNewReimb, updateReimb } from '../dao/reimb-dao'
import { Reimbursement } from '../models/Reimbursement'
//import { BadCredError } from '../errors/Bad CredentialsErr'
import { AuthError } from '../errors/AuthError'
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




//Find Reimb by Users
rRouter.get('/author/userId/:userId', authorizationMiddleware(['Finance Manager', request.params]), async (req:Request, res:Response, next:NextFunction) =>{
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
                //won't let me set status, only send? why?
                res.json(savedReimb)


            }
            
        } catch (err) {
            next (err)
        }
        
    }

})



//Update Reimbursement
rRouter.patch('/', authorizationMiddleware(['Finance Manager']), async (req:Request, res:Response, next: NextFunction) => {
//The reimbursementId must be present as well as all fields to update, 
//any field left undefined will not be updated. This can be used to approve and deny.

    let upd_reimb: Reimbursement = req.body
   
    if (isNaN(upd_reimb.reimbursementId)){
        throw AuthError
    } else if(!upd_reimb){
        throw new Error ('Please provide details to update')
    }

    try{
        let result = await updateReimb(upd_reimb)
        res.json(result)

    }catch (err){
        next(err)

    }


})

