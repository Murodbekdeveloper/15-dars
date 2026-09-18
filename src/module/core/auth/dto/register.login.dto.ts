import { IsString } from "class-validator";

export class RegisterAuthDto {
    @IsString()
    username!: string
    @IsString()
    password!: string
    @IsString()
    email!: string
}
export class LoginAuthDto {
    @IsString()
    username!: string
    @IsString()
    password!: string
}
