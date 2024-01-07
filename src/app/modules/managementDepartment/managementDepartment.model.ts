import { Schema, model } from 'mongoose';
import { TManagementDepartment } from './managementDepartment.interface';

const managementDepartment = new Schema<TManagementDepartment>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Management Department is required'],
    },
  },
  { timestamps: true },
);

export const ManagementDepartment = model<TManagementDepartment>(
  'ManagementDepartment',
  managementDepartment,
);
