import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { reimbDTOtoReimb } from "../utils/ReimbDTO-to-Reimb";
import { ReimbNotFoundError } from "../errors/ReimbNotFoundError";
import { UserNotFoundError } from "../errors/UserNotFoundErr";




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