import { ReimbDTO } from "../dto/reimb-dto";
import { Reimbursement } from "../models/Reimbursement";


export function reimbDTOtoReimb (rto: ReimbDTO): Reimbursement {
    return{
        reimbursementId: rto.reimbursement_id,
        author: rto.author,
        amount: rto.amount,
        description:rto.description,
        dateSubmitted:  rto.date_submitted,
        //convert this to number!
        dateResolved: rto.date_resolved,
        resolver: rto.resolver,
        status: rto.status,
        type:rto.type

    }


}