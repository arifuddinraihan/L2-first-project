import httpStatus from 'http-status';
import AppError from '../../errors/AppErrors';
import { TManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

//
const createManagementDepartmentIntoDB = async (
  payload: TManagementDepartment[],
) => {
  const result = await ManagementDepartment.insertMany(payload);
  return result;
};

//
const getAllManagementDepartmentFromDB = async () => {
  const result = await ManagementDepartment.find().select(
    '-__v -createdAt -updatedAt',
  );
  return result;
};

//
const getSingleManagementDepartmentFromDB = async (_id: string) => {
  const result = await ManagementDepartment.findById(_id).select('-__v');
  if(!result){
    throw new AppError(httpStatus.NOT_FOUND, "Invalid Management Department ID")
  }
  return result;
};

//
const updateSingleManagementDepartmentIntoDB = async (
  _id: string,
  payload: TManagementDepartment,
) => {
  const result = await ManagementDepartment.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartmentIntoDB,
  getAllManagementDepartmentFromDB,
  getSingleManagementDepartmentFromDB,
  updateSingleManagementDepartmentIntoDB,
};
