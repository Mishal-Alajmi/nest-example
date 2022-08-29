import { CountryCodes, Gender, RegistrationEndpoint } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, isPhoneNumber, IsString, IsUrl, Max, Min } from 'class-validator';

export class CreateUserDto {
    
    @IsString()
    @Min(8, {
        message: "Password must be a minimum of 8 characters"
    })
    @Max(16, {
        message: "Passwords must not exceed 16 characters"
    })
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsString()
    @IsOptional()
    readonly bio: string;

    @IsEnum(Gender)
    @IsNotEmpty()
    readonly gender: string;

    @Type(() => URL)
    @IsUrl()
    @IsOptional()
    readonly avatarUrl: string;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    readonly birthDate: string;

    @IsString()
    @IsOptional()
    readonly referedBy: string;

    @IsEnum(RegistrationEndpoint)
    @IsOptional()
    readonly registrationEndpoint: RegistrationEndpoint;

    @IsEnum(CountryCodes)
    @IsOptional()
    readonly countryCode: CountryCodes;

    @IsString()
    @IsNotEmpty()
    readonly city: string;

    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @IsString()
    @IsNotEmpty()
    readonly zipCode: string;

    @IsInt()
    @IsOptional()
    readonly loginAttempts: number

    @IsDate()
    @IsOptional()
    readonly lastLoginAttempt: Date;
}
