import { Request, Response, NextFunction } from "express";


export function authorizationMiddleware(roles:any){
    return (req:Request, res:Response, next:NextFunction) => {
        let allowed = false

            
        for(const role of roles){
            if(req.session.user.roleDetails.role === role){
                allowed = true
                next()
            } 
            
        }

        if (!allowed){
            if (req.session.user === req.params.userId){
                allowed = true
                next()
    
            }
        }

        
       
        if(!allowed){
            res.status(401).send("The Incoming Token has Expired - nocreds!")
        }
    }

}
