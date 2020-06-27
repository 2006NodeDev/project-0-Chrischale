import { HttpError } from "./httpErr";

export class UserIdIncorrectError extends HttpError {
    constructor(){
        super(400, 'User ID must be a Number')
    }
}