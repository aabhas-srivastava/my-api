import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = new this.taskModel({
      id : uuidv4(),
      ...createTaskDto,
    });
    return newTask.save();
  }

  async findAll(status?: string, priority?: string, search?: string) {
    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if(priority){
      filter.priority = priority;
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    return this.taskModel.find(filter).exec();
  }

  async findOne(id: string) {
    const task = await this.taskModel.findOne({id}).exec();

    if (!task) {
      throw new NotFoundException(`task ID ${id} not found`);
    }

    return task;
  }

  async update(id : string, updateTaskDto : UpdateTaskDto){
    const updateTask = await this.taskModel.findOneAndUpdate({id}, updateTaskDto, {new : true}).exec();

    if(!updateTask){
      throw new NotFoundException('task not found');
    }

    return updateTask;
  }

  async remove(id : string){
    const result = await this.taskModel.findOneAndDelete({id}).exec();

    if(!result){
      return new NotFoundException('task not found');
    }

    return {message : 'task deleted successfully'};
  }

}