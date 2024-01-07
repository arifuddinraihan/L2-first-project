import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ManagementDepartmentService } from './managementDepartment.service';

const createManagementDepartment = catchAsync(async (req, res) => {
  const result =
    await ManagementDepartmentService.createManagementDepartmentIntoDB(
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Departments are created successfully!',
    data: result,
  });
});

export const ManagementDepartmentController = {
  createManagementDepartment,
};
