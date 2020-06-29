import express, { Response, Request, NextFunction } from 'express'
import { uRouter } from './routers/user-router' 
import { sessionMiddleware } from './middleware/session-middleware'
import { BadCredError } from './errors/Bad CredentialsErr'
import { rRouter } from './routers/reimb-router'
import { getUserByUsernamePassword } from './dao/users-dao'


const app = express()


//to ensure a body parser is used. <- middleware!
app.use(express.json())

// to track server connections
app.use(sessionMiddleware)


app.use('/users', uRouter)
app.use('/reimbursements', rRouter)



//Login Endpoint
app.post('/login', async (req:Request, res:Response, next:NextFunction) => {
    //assign request's username and password to variables to compare
    let uname = req.body.username
    let pwd = req.body.password

    if(!(uname || pwd)){
        throw new BadCredError()
    } else {
        try{
            let result_user = await getUserByUsernamePassword(uname,pwd)
            req.session.user = result_user
            res.json(result_user)

        }catch (err){
            next(err)

        }        
    }    

  
})




app.use((err, req, res, next) => {
    if (err.statusCode){
        res.status(err.statusCode).send(err.message)
    }else{
        console.log(err)
        res.status(500).send('Something Went Wrong')

    }
})


app.listen(2020, ()=>{
    console.log("Server has started")
})








