import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as argon2 from 'argon2';
import { Gender, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hash = await argon2.hash(createUserDto.password, { 
        timeCost: 5,
        type: argon2.argon2id,
        hashLength: 32
      });
      const user = await this.prisma.user.create({
        data: {
          first_name: createUserDto.firstName,
          last_name: createUserDto.lastName,
          email: createUserDto.email,
          phone_number: createUserDto.phoneNumber,
          hash: hash,
          bio: createUserDto.bio,
          gender: Gender[createUserDto.gender],
          avatar_url: createUserDto.avatarUrl,
          birth_date: createUserDto.birthDate,
          registration_endpoint: createUserDto.registrationEndpoint,
          country_code: createUserDto.countryCode,
          city: createUserDto.city,
          address: createUserDto.address,
          zip_code: createUserDto.zipCode,
        }
      });
      return user;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(`[Prisma Error]: Code: ${e.code}\n Msg: ${e.message}`);
      }
      throw e;
    }
  }
  async findAll(): Promise<User[] | null> {
    return await this.prisma.user.findMany();
  }
  async findOne(id: number): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id
      }
    });
    return user;
  }
  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email
      }
    });
    return user;
  }
  async findOneByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        phone_number: phoneNumber.toString()
      }
    });
    return user;
  }
  async update(username: string,updateUserDto: UpdateUserDto): Promise<boolean> {
    try {
      const user = await this.findOneByEmail(username);

      if (!user) {
        throw new NotFoundException("User not found");
      }

      const updatedUser = await this.prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          first_name: updateUserDto?.firstName,
          last_name: updateUserDto?.lastName,
          email: updateUserDto?.email,
          phone_number: updateUserDto?.phoneNumber,
          avatar_url: updateUserDto?.avatarUrl,
          city: updateUserDto?.city,
          address: updateUserDto?.address,
          zip_code: updateUserDto?.zipCode
        }
      });
      return updatedUser ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async updateEmailVerification(email: string): Promise<Boolean> {
    try {
      const isEmailVerificationDone = await this.prisma.user.update({
        where: {
          email: email
        },
        data: {
          is_email_verified: true
        }
      });
      return isEmailVerificationDone.is_email_verified;

    } catch(e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(`[Prisma Error]: Code: ${e.code}\n Msg: ${e.message}`);
        throw e.code;
      }
      throw new Error(`[Shorak]: Internal Error: ${e}`);
    }
  }
  async remove(id: number): Promise<boolean> {
    return false;
  }
}
