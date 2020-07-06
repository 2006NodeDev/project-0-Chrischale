import { Request, Response, NextFunction } from "express";


export function authorizationMiddleware(roles:string[]){
    return (req:Request, res:Response, next:NextFunction) => {
        let allowed = false
        console.log(req.session.user.userId)
        console.log(req.params.id)
        console.log(req.session.user.roleDetails.role)

        if (req.session.user.userId == req.params.id){
            allowed = true
            next()
            
        } else {
            for(const role of roles){
                console.log (role)
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
