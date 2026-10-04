import { IsString, IsNotEmpty, IsOptional,  IsIn } from 'class-validator';

export class CreateTaskDto{
    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    @IsOptional()
    description ?: string;

    @IsString()
    @IsOptional()
    @IsIn(['high', 'medium', 'low'])
    priority : string;

    @IsString()
    @IsOptional()
    @IsIn(['pending', 'completed'])
    status : string;
}