import { UserDTO } from "../dto/user-dto";
import { User } from "../models/Users";


export function userDTOtoUser(uto: UserDTO):User{
    
    return{
        userId: uto.userId,
        username: uto.username,
        password: uto.password,
        firstName: uto.firstName,
        lastName: uto.lastName,
        email: uto.email,
        rolename: { roleID: uto.roleID, role: uto.role }
    }

}