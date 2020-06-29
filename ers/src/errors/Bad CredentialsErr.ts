import { HttpError } from "./httpErr";

export class BadCredError extends HttpError{
    constructor(){
        super(400, 'Please enter all credentials')
    }
}