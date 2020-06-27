import { HttpError } from "./httpErr";

export class BadCredErr extends HttpError{
    constructor(){
        super(400, 'Please enter a Username and Password')
    }
}