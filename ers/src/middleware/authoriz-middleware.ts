import { Request, Response, NextFunction } from "express";


export function authorizationMiddleware(roles:string[]){// build a middleware function
    return (req:Request, res:Response, next:NextFunction) => {
        let allowed = false
        let req_role = req.body.role
        for(const role of roles){
            if(req_role == role){
                //we found a matching role, allow them in
                allowed = true
                next()
            }
        }
        if(!allowed){
            // if they didn't have a matching role kick em out
            res.status(401).send("The Incoming Token has Expired")
        }
    }

}