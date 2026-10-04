import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {

  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['high', 'medium', 'low'] })
  priority: string;

  @Prop({ required: true, enum: ['pending', 'completed'] })
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);