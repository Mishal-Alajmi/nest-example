import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Redirect('/auth/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException('Could not create user', HttpStatus.INTERNAL_SERVER_ERROR);
      
    }
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':email')
  async findOneByEmail(@Param('email') email:string) {
    return await this.userService.findOneByEmail(email);
  }

  @Get(':phoneNumber')
  async findOneByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return await this.userService.findOneByPhoneNumber(phoneNumber);
  }

  @Patch(':username')
  update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(username, updateUserDto);
  }

  @Patch("email/:email")
  async updateEmailVerification(@Param('email') email: string) {
    try {
      const verificationComplete = await this.userService.updateEmailVerification(email);
      if (!verificationComplete) {
        throw new HttpException("Could not verify user's email", HttpStatus.SERVICE_UNAVAILABLE);
      }
      const response = {
        "statusCode": 200,
        "message": true
      }
      return response;
    } catch (error) {
      throw new HttpException('The user was not found', HttpStatus.UNAUTHORIZED);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}