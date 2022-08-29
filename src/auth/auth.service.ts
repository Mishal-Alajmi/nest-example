import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/user/dto';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}
        
    async validate(username: string, plain: string): Promise<any>{
        const user = await this.userService.findOneByEmail(username);
        if (user && await argon2.verify(user?.hash, plain)) {
            const {hash, ...result} = user;
            return result;
        }
        return null;
    }
    async register(signupReq: CreateUserDto): Promise<{access_token: string}> {
        const registeredUser = await this.userService.create(signupReq);
        // const token = 
        return {access_token: "hello"}
    }
    // TODO figure out which startegy works best for jwt <blacklist...etc>
    async logout (): Promise<any> {}
}
    