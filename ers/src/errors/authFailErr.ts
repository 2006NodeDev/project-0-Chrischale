import { HttpError } from "./httpErr";

export class AuthError extends HttpError {
    constructor(){
        super(401, 'Incorrect Username or Password')
    }
}