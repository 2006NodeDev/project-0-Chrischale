import express, { Response, Request } from 'express'
import { uRouter, user_arr } from './routers/user-router' 
import { sessionMiddleware } from './middleware/session-middleware'
import { AuthError } from './errors/AuthError'
import { BadCredError } from './errors/Bad CredentialsErr'
import { rRouter } from './routers/reimb-router'



const app = express()


//to ensure a body parser is used. <- middleware!
app.use(express.json())

// to track server connections
app.use(sessionMiddleware)

app.use('/users', uRouter)
app.use('/reimbursements', rRouter)


// app.post('/users', (req:chRequest, res:Response) => {
//     console.log(req.body)
//     let {userId,
//         username,
//         password,
//         firstName,
//         lastName,
//         email,
//         rolename   } = req.body

//         if(userId &&  username && password && firstName && lastName && email && rolename ){
//                 users.push({userId, username, password, firstName, lastName, email, rolename})
//                 res.sendStatus(201)
//         }else{
//             res.status(400).send("Fill out all fields")

//         }
//     res.sendStatus(501)
// })



//Login Endpoint
app.post('/login', (req:Request, res:Response) => {
    //assign request's username and password to variables to compare
    let uname = req.body.username
    let pwd = req.body.password
    let found = false

    if(!(uname || pwd)){
        throw new BadCredError()
    } else {
          //iterate through all the users in the array  "users" created below
        for (const user of user_arr){
            //if both username and password match the user in the array's, then return the json obj
            if ((user.username === uname && user.password === pwd)){
                //RETRIEVE USERS FROM DB***
                found = true
                req.session.user = user
                res.json(user)
            }
        }
        if (!found){
            throw new AuthError()        
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








