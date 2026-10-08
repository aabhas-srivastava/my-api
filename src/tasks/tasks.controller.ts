import { Controller, Get, Post, Body, Param, Query, Patch, Delete, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req : any) {
    return this.tasksService.create(createTaskDto, req.user.userId);
  }

  @Get()
  findAll(
    @Request() req : any,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('search') search?: string,
  ) {
    return this.tasksService.findAll(req.user.userId, status, priority, search);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string, @Request() req : any) {
    return this.tasksService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id : string,
    @Body() updateTaskDto : UpdateTaskDto,
    @Request() req : any,
  ){
    return this.tasksService.update(id, req.user.userId, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id : string, @Request() req : any,){
    return this.tasksService.remove(id, req.user.userId);
  }
}