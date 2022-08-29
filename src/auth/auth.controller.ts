import { Body, Controller, HttpException, HttpStatus, Post, Redirect } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateLawyerDto } from 'src/lawyer/dto';
import { CreateUserDto } from 'src/user/dto';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    // @Redirect('/')
    async login(@Body() loginReq: CreateLoginDto): Promise<any> {
        const { username, plain } = loginReq;
        const found: User | null = await this.authService.validate(username, plain);

        if (!found) {
            throw new HttpException('The username or password you entered is incorrect', HttpStatus.UNAUTHORIZED);
        }

        return found;
    }

    @Post('signup')
    @Redirect('/')
    async signup(@Body() signupReq: CreateUserDto): Promise<any> {
        return this.authService.register(signupReq);
    }

    @Post('logout')
    @Redirect('/')
    async logout(): Promise<any> {
        return this.authService.logout();
    }
}