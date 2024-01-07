import { TManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

const createManagementDepartmentIntoDB = async (
  payload: TManagementDepartment[],
) => {
  const result = await ManagementDepartment.insertMany(payload);
  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartmentIntoDB,
};
