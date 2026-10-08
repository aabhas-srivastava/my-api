import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {

  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false, enum: ['high', 'medium', 'low'], default: 'medium' })
  priority: string;

  @Prop({ required: false, enum: ['pending', 'in_progress', 'completed'], default: 'pending' })
  status: string;

  @Prop({required : true})
  userId : string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);