import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { userDTOtoUser } from "../utils/UserDTO-to-User";
import { UserNotFoundError } from "../errors/UserNotFoundErr";
import { AuthError } from "../errors/AuthError";
import { User } from "../models/Users";



//login

export async function getUserByUsernamePassword(username: string, password:string) : Promise <User>{
    let client: PoolClient

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query(`select * from ers."users" u left join ers."roles" r2 on u."role" = r2."role_id" where u."username" = $1 and u."password" = $2;`, [username, password])
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
        let result:QueryResult = await client.query('select * from ers."users" u left join ers."roles" r on r."role_id" = u."role";')
        
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



//update user

// export async function updateUser(changeUser: User) : Promise <User>{

// //The userId must be presen as well as all fields to update, any field left undefined will not be updated.

//     let client: PoolClient
    
//     //if anything is undefined, remove it from the updating object
//     for (const f in changeUser){
//         if (!f){
//             delete changeUser[f]
//         }
//     }

//     try{
//         //check if userID exists if not throw a user not found err        
//         client = await connectionPool.connect()

//         let u_id = await client.query(`select * from ers."users" where "user_id = $1`, [changeUser.userId])
//         if(u_id.rowCount === 0){
//             throw new UserNotFoundError
//         }

//         let ret_User = await client.query(`update ers."users" set, "first_name" = $1, "last_name" = $2, "email" = $3, "role" = $4`, [])
    
    
//     }catch (err) {
//         console.log(err)
//         throw new Error ('Unimplemented user error')

//     }


// }
