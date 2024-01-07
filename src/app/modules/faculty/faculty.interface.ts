import { Model, Types } from 'mongoose';
import { TUserName } from '../user/user.interface';

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
};

//for creating static

export interface FacultyModel extends Model<TFaculty> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TFaculty | null>;
}
