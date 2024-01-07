import mongoose from 'mongoose';
import AppError from '../../errors/AppErrors';
import httpStatus, { NOT_FOUND } from 'http-status';
import { User } from '../user/user.model';
import { Faculty } from './faculty.model';
import { TFaculty } from './faculty.interface';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  // {email : { $regex : query.searchTerm, $option : i }}
  const queryObj = { ...query }; // copy
  const facultySearchableFields = ['email', 'name.firstName', 'presentAddress'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  // Search Query receiving a query from Faculty.Find
  const searchQuery = Faculty.find({
    $or: facultySearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $option: 'i' },
    })),
  });

  // Filtering
  const excludeFields = ['searchTerm'];
  excludeFields.forEach((element) => delete queryObj[element]);

  // Get All Faculties according to Search Query and filter query
  const result = await searchQuery
    .find(queryObj)
    .populate({
      path: 'academicDepartment',
      select: '-createdAt -updatedAt -_id -__v',
      populate: {
        path: 'academicFaculty',
        select: '-createdAt -updatedAt -_id -__v',
      },
    })
    .select('-isDeleted -_id -academicFaculty');
  return result;
};

const getSingleFacultyFromDB = async (_id: string) => {
  const isFacultyExists = await Faculty.isUserExists(_id);
  if (!isFacultyExists) {
    throw new AppError(NOT_FOUND, 'Faculty never exists');
  }
  const result = await Faculty.findById(_id)
    .populate({
      path: 'academicDepartment',
      select: '-createdAt -updatedAt -_id -__v',
      populate: {
        path: 'academicFaculty',
        select: '-createdAt -updatedAt -_id -__v',
      },
    })
    .select('-isDeleted -_id -academicFaculty');
  return result;
};

// Update A Faculty In DB
const updateSingleFacultyIntoDB = async (
  id: string,
  payload: Partial<TFaculty>,
) => {
  // Separating non-primitive data types from payload
  const { name, ...restUpdatedFacultyData } = payload;

  // making a copy of payload with only primitive data types
  const modifiedFacultyData: Record<string, unknown> = {
    ...restUpdatedFacultyData,
  };

  // For non-primitive data types checking the length and settling properties in primitive types
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedFacultyData[`name.${key}`] = value;
    }
  }

  // Updating Faculty with payload copied data in modifiedStudentData from above
  const result = await Faculty.findOneAndUpdate({ id }, modifiedFacultyData, {
    new: true,
  });

  return result;
};

// Delete Single Faculty from faculties and users
const deleteSingleFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    // console.log(deletedStudent);

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Unable to delete the Faculty');
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateSingleFacultyIntoDB,
  deleteSingleFacultyFromDB,
};
