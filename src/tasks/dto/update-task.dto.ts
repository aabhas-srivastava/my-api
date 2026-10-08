import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdateTaskDto{
    @IsString()
    @IsOptional()
    title ?: string;

    @IsString()
    @IsOptional()
    @IsIn(['pending', 'in_progress', 'completed'])
    status ?: string;

    @IsString()
    @IsOptional()
    @IsIn(['low', 'high', 'medium'])
    priority ?: string;
}