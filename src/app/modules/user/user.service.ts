import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // If password not give then use default password
  // set password as string as it is settled as string
  userData.password = password || (config.default_password as string);

  // setting user role to "student"
  userData.role = 'student';

  // Manual user id
  userData.id = '2030100001';
  // Create New User
  const result = await Student.create(userData);

  // Create New Student
  if (Object.keys(result).length) {
    //set [id], [_id] as user in studentData
    studentData.id = result.id;
    studentData.user = result._id;
  }

  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
