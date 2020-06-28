import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";


export async function getAllUsers(){
    let client:PoolClient

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query('select * from ers."users" u left join ers."roles" r on r."roleID" = u."role";')
        return result.rows

    }catch (err){
        console.log(err)
        throw new Error('Unimplemented Error lol')

    }finally{
        client && client.release()

    }

}