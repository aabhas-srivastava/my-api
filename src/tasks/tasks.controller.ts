import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    findAll(
        @Query('status') status ?: string,
        @Query('search') search ?: string,
    ) {
        return this.tasksService.findAll(status, search);
    }

    @Get(':id')
    findOne(@Param('id') id :string){
        return this.tasksService.findOne(Number(id));
    }

    @Post()
    create(
        @Body() body : {title : string; description : string; priority : string; status : string}
    ) {
        return this.tasksService.create(body);
    }
}
