import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService{
    constructor(
        private usersService : UsersService,
        private jwtService : JwtService,
    ) {}

    async login (loginDto : LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);

        if(!user){
            throw new UnauthorizedException('invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('invalid credentials');
        }

        const payload = {sub : user.id, email : user.email};

        return {
            access_token : await this.jwtService.signAsync(payload)
        };
    }
}