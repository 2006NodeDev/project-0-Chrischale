import { HttpError } from "./httpErr";

export class AuthorizationError extends HttpError {
    constructor(){
        super(400, 'Invalid Credentials')
    }
}