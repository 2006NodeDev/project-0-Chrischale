import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { userDTOtoUser } from "../utils/UserDTO-to-User";
import { UserNotFoundError } from "../errors/UserNotFoundErr";
import { AuthError } from "../errors/AuthError";
//import { User } from "../models/Users";
//import e from "express";


export async function getUserByUsernamePassword(username: string, password:string){
    let client: PoolClient

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query(`select * from users u where u."username" = $1 and u."password" = $2;`, [username, password])
        if (result.rowCount === 0){
            throw new Error ('User Not Found')
        } else {
            return result.rows.map(userDTOtoUser[0])

        }

    }catch (err){
        if(err.message === 'User Not Found'){
            throw new AuthError
        }
        throw new Error('Unimplimented id error')


    } finally {
        client && client.release()
    }
}

export async function getAllUsers(){
    let client:PoolClient

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query('select * from ers."users" u left join ers."roles" r on r."role_id" = u."role";')
        
        return result.rows.map(userDTOtoUser)

    }catch (err){

        console.log(err)
        throw new Error('No Users in System')

    }finally{
        client && client.release()

    }

}

export async function findUserbyID(id: number){
    let client:PoolClient

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query(`select * from ers."users" u left join ers."roles" r on r."role_id" = u."role" where u."role" = $1;`, [id])
        
        if (result.rowCount === 0){
            throw new Error('User Not Found')
        } else{
            return userDTOtoUser(result.rows[0])


        }

    }catch (err){
        if(err.message === 'User Not Found'){
            throw new UserNotFoundError()
        }
        throw new Error('Unimplimented id error')
        
 
    }finally{
        client && client.release()

    }
 

}