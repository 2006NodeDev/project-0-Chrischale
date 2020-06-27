import { HttpError } from "./httpErr";

export class AuthError extends HttpError {
    constructor(){
        super(400, 'Invalid Credentials')
    }
}