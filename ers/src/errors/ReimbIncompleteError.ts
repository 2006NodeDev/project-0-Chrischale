import { HttpError } from "./httpErr";

export class ReimbIncompleteError extends HttpError {
    constructor(){
        super(400, 'Please Fill All Fields')
    }
}