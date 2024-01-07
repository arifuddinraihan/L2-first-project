import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  // generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';

// Create STUDENT from user data and setting the student ID as 2030010001 Demo
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // If password not give then use default password
  // set password as string as it is settled as string
  userData.password = password || (config.default_password as string);

  // setting user role to "student"
  userData.role = 'student';

  //find Academic Semester Info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // Creating RollBack Session from Mongoose
  const session = await mongoose.startSession();

  try {
    // Starting RollBack Session
    session.startTransaction();
    // Automatic student user id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    // Create New User (transaction - 1) // in transaction if its "create" operation it can take every data should be passed inside ARRAY
    const newUser = await User.create([userData], { session }); //userData inside array
    // If no user created sending error
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    //set [id], [_id] as user in studentData
    payload.id = newUser[0].id; // embedding id
    payload.user = newUser[0]._id; // reference _id

    // Create a student (transaction - 2)
    const newStudent = await Student.create([payload], { session });
    // If no student created sending error
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // Committing RollBack Session as session has passed the check
    await session.commitTransaction();
    // Ending RollBack Session as session has completed successfully
    await session.endSession();
    return newStudent;
  } catch (err) {
    // Aborting RollBack Session as session has failed
    await session.abortTransaction();
    // Ending RollBack Session as session has completed unsuccessfully
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }
};

// Create FACULTY from user data and setting the faculty ID as F-0001 Demo
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // If password not give then use default password
  // set password as string as it is settled as string
  userData.password = password || (config.default_password as string);

  // setting user role to "student"
  userData.role = 'faculty';

  // Creating RollBack Session from Mongoose
  const session = await mongoose.startSession();

  try {
    // Starting RollBack Session
    session.startTransaction();
    // Automatic faculty user id
    userData.id = await generateFacultyId();

    const newUser = await User.create([userData], { session }); //userData inside array
    // If no user created sending error
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    //set [id], [_id] as user in studentData
    payload.id = newUser[0].id; // embedding id
    payload.user = newUser[0]._id; // reference _id

    // Create a faculty (transaction - 2)
    const newFaculty = await Faculty.create([payload], { session });
    // If no student created sending error
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    // Committing RollBack Session as session has passed the check
    await session.commitTransaction();
    // Ending RollBack Session as session has completed successfully
    await session.endSession();
    return newFaculty;
  } catch (err) {
    // Aborting RollBack Session as session has failed
    await session.abortTransaction();
    // Ending RollBack Session as session has completed unsuccessfully
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
