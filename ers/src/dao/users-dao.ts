import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { userDTOtoUser } from "../utils/UserDTO-to-User";
import { UserNotFoundError } from "../errors/UserNotFoundErr";
import { AuthError } from "../errors/AuthError";
import { User } from "../models/Users";
import { BadCredError } from "../errors/Bad CredentialsErr";



//login

export async function getUserByUsernamePassword(username: string, password:string) : Promise <User>{
    let client: PoolClient

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query(`select * from ers."users" u left join ers."roles" r2 on u."role_id" = r2."role_id" where u."username" = $1 and u."password" = $2;`, [username, password])
        if (result.rowCount === 0){
            throw new Error ('User Not Found')
        } else {
            return userDTOtoUser(result.rows[0])

        }

    }catch (err){
        if(err.message === 'User Not Found'){
            throw new AuthError
        }
        throw new Error('cant login error')


    } finally {
        client && client.release()
    }
}


//get all users

export async function getAllUsers(){
    let client:PoolClient

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query('select * from ers."users";')
        
        return result.rows.map(userDTOtoUser)

    }catch (err){

        console.log(err)
        throw new Error('No Users in System')

    }finally{
        client && client.release()

    }

}



//get users by id

export async function findUserbyID(id: number){
    let client:PoolClient

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query(`select * from ers."users" u where u."user_id" = $1;`, [id])
        
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



//update user

export async function updateUser(upd_Reimb : User) : Promise <User>{
    let client:PoolClient
      
    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let n = await client.query(`select * from ers."users" r where  r."user_id" = $1;`, [upd_Reimb.userId])

        //convert required user to a User object
        let newReimb = userDTOtoUser(n.rows[0])
        console.log(newReimb)

        for (const f in upd_Reimb){
            console.log(f)

            let q =  upd_Reimb[f]
            newReimb[f] = q           
            
        }
        

        let result = await client.query(`update ers."users" u set "first_name" = $1, "last_name" = $2, "email" = $3, "role_id" = $4, "role" = $5 where u."user_id" =  $6 returning *;`, 
                                                        [newReimb.firstName, newReimb.lastName, newReimb.email, newReimb.roleDetails.roleID, newReimb.roleDetails.role, upd_Reimb.userId])
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


