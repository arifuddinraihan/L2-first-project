import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ManagementDepartmentService } from './managementDepartment.service';

//
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

//
const getAllManagementDepartments = catchAsync(async (req, res) => {
  const result =
    await ManagementDepartmentService.getAllManagementDepartmentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Departments are retrieved successfully!',
    data: result,
  });
});

//
const getSingleManagementDepartment = catchAsync(async (req, res) => {
  const { managementDepartmentId } = req.params;
  const result =
    await ManagementDepartmentService.getSingleManagementDepartmentFromDB(
      managementDepartmentId,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department is retrieve successfully!',
    data: result,
  });
});

//
const updateSingleManagementDepartment = catchAsync(async (req, res) => {
  const { ManagementDepartmentId } = req.params;
  const result =
    await ManagementDepartmentService.updateSingleManagementDepartmentIntoDB(
      ManagementDepartmentId,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Departments is updated successfully!',
    data: result,
  });
});

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  updateSingleManagementDepartment,
};
