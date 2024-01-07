import { Schema, model } from 'mongoose';
import { TCourse, TPreRequisiteCourse } from './course.interface';

// Pre Requisite Course Schema
const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
  course: {
    type: Schema.Types.ObjectId,
  },
  isDeleted: {
    type: Boolean,
  },
});

// Course Schema
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCourseSchema],
});

export const Course = model<TCourse>('Course', courseSchema);
