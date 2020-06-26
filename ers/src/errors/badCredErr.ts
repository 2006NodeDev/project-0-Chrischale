import { HttpError } from "./httpErr";

export class BadCredErr extends HttpError{
    constructor(){
        super(400, 'Please Include a Username and Password')
    }
}