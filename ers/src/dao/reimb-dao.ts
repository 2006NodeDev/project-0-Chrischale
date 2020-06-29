import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { reimbDTOtoReimb } from "../utils/ReimbDTO-to-Reimb";


export async function getAllReimbursements(){
    let client:PoolClient

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query('select * from ers."reimbursement" r;')
        return result.rows.map(reimbDTOtoReimb)

    }catch (err){
        console.log(err)
        throw new Error('Unimplemented Error lol')

    }finally{
        client && client.release()

    }

}