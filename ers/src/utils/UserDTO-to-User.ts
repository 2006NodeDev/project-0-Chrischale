import { UserDTO } from "../dto/user-dto";
import { User } from "../models/Users";


export function userDTOtoUser(uto: UserDTO):User{
    
    return{
        userId: uto.user_id,
        username: uto.username,
        password: uto.password,
        firstName: uto.first_name,
        lastName: uto.last_name,
        email: uto.email,
        roleDetails: { roleID: uto.role_id, role: uto.role }
    }

}