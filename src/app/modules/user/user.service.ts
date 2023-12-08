import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // If password not give then use default password
  // set password as string as it is settled as string
  userData.password = password || (config.default_password as string);

  // setting user role to "student"
  userData.role = 'student';

  //find Academic Semester Info
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);

  // Automatic user id
  userData.id = await generateStudentId(admissionSemester);
  // Create New User
  const newUser = await User.create(userData);

  // Create New Student
  if (Object.keys(newUser).length) {
    //set [id], [_id] as user in studentData
    payload.id = newUser.id; // embedding id
    payload.user = newUser._id; // reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
