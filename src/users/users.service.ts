import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel : Model<User>) {}

    async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email.toLowerCase();

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
        throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = new this.userModel({
        id: uuidv4(),
        name: createUserDto.name,
        email,
        password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const { password, ...result } = savedUser.toObject();
    return result;
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email: email.toLowerCase() }).exec();
    }

    async findById(id : string){
        return this.userModel.findOne({id}).exec();
    }
}
