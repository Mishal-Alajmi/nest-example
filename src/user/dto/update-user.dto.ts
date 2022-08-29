import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly firstName: string;

    @IsString()
    @IsOptional()
    readonly lastName: string;

    @IsEmail()
    @IsOptional()
    readonly email: string;

    @IsString()
    @IsOptional()
    readonly phoneNumber: string;

    @IsString()
    @IsOptional()
    readonly bio:string;

    @Type(() => URL)
    @IsUrl()
    @IsOptional()
    readonly avatarUrl: string;

    @IsString()
    @IsOptional()
    readonly city: string;

    @IsString()
    @IsOptional()
    readonly address: string;

    @IsString()
    @IsOptional()
    readonly zipCode: string;
}
