import mongoose from 'mongoose';
import AppError from '../../errors/AppErrors';
import httpStatus, { NOT_FOUND } from 'http-status';
import { User } from '../user/user.model';
import { Admin } from './admin.model';
import { TAdmin } from './admin.interface';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  // {email : { $regex : query.searchTerm, $option : i }}
  const queryObj = { ...query }; // copy
  const adminSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  // Search Query receiving a query from Admin.Find
  const searchQuery = Admin.find({
    $or: adminSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $option: 'i' },
    })),
  });

  // Filtering
  const excludeFields = ['searchTerm'];
  excludeFields.forEach((element) => delete queryObj[element]);

  // Get All Admins according to Search Query and filter query
  const result = await searchQuery
    .find(queryObj)
    .populate({
      path: 'managementDepartment',
      select: '-createdAt -updatedAt -_id -__v',
    })
    .select('-isDeleted -_id');
  return result;
};

const getSingleAdminFromDB = async (_id: string) => {
  const isAdminExists = await Admin.isUserExists(_id);
  if (!isAdminExists) {
    throw new AppError(NOT_FOUND, 'Admin never exists');
  }
  const result = await Admin.findById(_id)
    .populate({
      path: 'managementDepartment',
      select: '-createdAt -updatedAt -_id -__v',
    })
    .select('-isDeleted -_id');
  return result;
};

// Update an Admin In DB
const updateSingleAdminIntoDB = async (
  id: string,
  payload: Partial<TAdmin>,
) => {
  // Separating non-primitive data types from payload
  const { name, ...restUpdatedAdminData } = payload;

  // making a copy of payload with only primitive data types
  const modifiedAdminData: Record<string, unknown> = {
    ...restUpdatedAdminData,
  };

  // For non-primitive data types checking the length and settling properties in primitive types
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedAdminData[`name.${key}`] = value;
    }
  }

  // Updating Admin with payload copied data in modifiedAdminData from above
  const result = await Admin.findOneAndUpdate({ id }, modifiedAdminData, {
    new: true,
  });

  return result;
};

// Delete Single Admin from faculties and users
const deleteSingleAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedAdmin = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
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
    return deletedAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Unable to delete the Admin');
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateSingleAdminIntoDB,
  deleteSingleAdminFromDB,
};
