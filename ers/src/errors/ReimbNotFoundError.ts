
import { HttpError } from "./httpErr";

export class ReimbNotFoundError extends HttpError {
    constructor(){
        super(404, 'Reimbursement Not Found')
    }
}