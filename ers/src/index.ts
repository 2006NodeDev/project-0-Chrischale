import express, { Response, Request } from 'express'
import { uRouter, user_arr } from './routers/user-router' 
import { sessionMiddleware } from './middleware/session-middleware'


const app = express()


//to ensure a body parser is used. <- middleware!
app.use(express.json())

// to track server connections
app.use(sessionMiddleware)

app.use('/users', uRouter)


// app.post('/users', (req:Request, res:Response) => {
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

    if(!uname || !pwd){
        res.status(400).send("Invalid Credentials")
    } else {
          //iterate through all the users in the array  "users" created below
        for (const u of user_arr){
            //if both username and password match the user in the array's, then return the json obj
            if ((u.username === uname) && (u.password === pwd)){
                //RETRIEVE USERS FROM DB***
                req.session.user = u
                res.json(u)
                res.send("Login Successful")
            }else{
                res.status(400).send("Invalid Credentials")
            }

        }


    }
    

  
})


app.listen(2020, ()=>{
    console.log("Server has started")
})








