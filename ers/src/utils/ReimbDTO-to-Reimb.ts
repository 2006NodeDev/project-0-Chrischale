import { ReimbDTO } from "../dto/reimb-dto";
import { Reimbursement } from "../models/Reimbursement";


export function reimbDTOtoReimb (rto: ReimbDTO): Reimbursement {
    return{
        reimbursementId: rto.reimbursementId,
        author: rto.author,
        amount: rto.amount,
        description:rto.description,
        dateSubmitted:  rto.dateSubmitted.getTime(),
        dateResolved: rto.dateResolved.getTime(),
        resolver: rto.resolver,
        status: rto.status,
        type:rto.type

    }


}