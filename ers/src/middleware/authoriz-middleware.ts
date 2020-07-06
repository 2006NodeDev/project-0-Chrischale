import { Request, Response, NextFunction } from "express";


export function authorizationMiddleware(roles:string[]){
    return (req:Request, res:Response, next:NextFunction) => {
        let allowed = false
       

        if (req.session.user.userId == (req.params.id || req.params.userId)){
            allowed = true
            next()
            
        } else {
            for(const role of roles){
               
                if(req.session.user.roleDetails.role === role){
                    allowed = true
                    next()
                } 
                
            } 

        }

        

      
        if(!allowed){
            res.status(401).send("The Incoming Token has Expired - nocreds!")
        }
    }

}
