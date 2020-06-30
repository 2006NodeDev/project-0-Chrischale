import { Request, Response, NextFunction } from "express";


export function authorizationMiddleware(roles:string[] | number[]){// build a middleware function
    return (req:Request, res:Response, next:NextFunction) => {
        let allowed = false
       
        for(const role of roles){
            if((req.session.user.roleDetails.role === role) || (req.session.user.userId === role)){
                allowed = true
                next()
            }
        }
        if(!allowed){
            res.status(401).send("The Incoming Token has Expired - nocreds!")
        }
    }

}
