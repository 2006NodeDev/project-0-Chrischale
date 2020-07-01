import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { reimbDTOtoReimb } from "../utils/ReimbDTO-to-Reimb";
import { ReimbNotFoundError } from "../errors/ReimbNotFoundError";
import { UserNotFoundError } from "../errors/UserNotFoundErr";
import { Reimbursement } from "../models/Reimbursement";
import { BadCredError } from "../errors/Bad CredentialsErr";


//get reimb by status id

export async function getStatusById(id: number){
    let client:PoolClient

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query(`select * from ers."reimbursement" r where r."status" = $1;`, [id])

        if (result.rowCount === 0){
            throw new Error('Reimbursements Not Found')
        } else{
            return result.rows.map(reimbDTOtoReimb)
        }

    }catch (err){
        if(err.message === 'Reimbursements Not Found'){
            throw new ReimbNotFoundError()
        }
        throw new Error('Unimplimented reimb status error')

    }finally{
        client && client.release()

    }

}




//get reimb by user id
export async function getStatusByUser(id: number){
    let client:PoolClient

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query(`select * from ers."reimbursement" r left join ers."users" u on r."author" = u."user_id"  where u."user_id" = $1;`, [id])

        if (result.rowCount === 0){
            throw new Error('Reimbursements Not Found under this ID')
        } else{
            return result.rows.map(reimbDTOtoReimb)
        }

    }catch (err){
        if(err.message === 'Reimbursements Not Found under this ID'){
            throw new UserNotFoundError()
        }
        throw new Error('unimplimented reimb by user error')

    }finally{
        client && client.release()

    }

}


//submit new reimb
export async function submitNewReimb(newReimb: Reimbursement) : Promise <Reimbursement>{
    let client:PoolClient
    console.log(newReimb)

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        
        let result:QueryResult = await client.query(`insert into ers."reimbursement" ("author", "amount", "date_submitted", "date_resolved", "description", "resolver", "status", "type")
                                                        values ($1, $2, $3, $4, $5, $6, $7, $8) returning "reimbursement_id"`, 
                                                        [newReimb.author, newReimb.amount, newReimb.dateSubmitted, newReimb.dateResolved, 
                                                            newReimb.description, newReimb.resolver, newReimb.status, newReimb.type])
        
        newReimb.reimbursementId = result.rows[0].reimbursement_id
        return newReimb
       

    }catch (err){
        
        console.log(err)
        throw new Error('Unimplimented id error')
        
 
    }finally{
        client && client.release()

    }
}





//update reimbursement
export async function updateReimb(upd_Reimb : Reimbursement) : Promise <Reimbursement>{
    let client:PoolClient
      
    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let n = await client.query(`select * from ers."reimbursement" r where  r."reimbursement_id" = $1;`, [upd_Reimb.reimbursementId])
        let newReimb = reimbDTOtoReimb(n.rows[0])

        for (const f in upd_Reimb){
  
            let q =  upd_Reimb[f]
            newReimb[f] = q
    
        
    
        }

        let result = await client.query(`update ers."reimbursement" set "author" = $1, "amount" = $2, "date_submitted" = $3, "date_resolved" = $4, 
                                            "description" = $5, "resolver" = $6, "status" = $7, "type" = $8 where "reimbursement_id" = $9 returning * ;`, 
                                                        [newReimb.author, newReimb.amount, newReimb.dateSubmitted, newReimb.dateResolved, 
                                                            newReimb.description, newReimb.resolver, newReimb.status, newReimb.type, upd_Reimb.reimbursementId])
        
        return result.rows[0]
        

        

    }catch (err){
        if (err.message === 'ID is not a number'){
            throw new BadCredError
        }
        
        console.log(err)
        throw new Error('Unimplimented id error')
        
 
    }finally{
        client && client.release()

    }
}




