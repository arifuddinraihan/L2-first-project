import express from 'express';
import validateRequest from '../../middlewares/validation.Request';
import { ManagementDepartmentValidations } from './managementDepartment.validation';
import { ManagementDepartmentController } from './managementDepartment.controller';

const router = express();

router.post(
  '/create-management-department',
  validateRequest(
    ManagementDepartmentValidations.createMultipleManagementDepartmentValidationSchema,
  ),
  ManagementDepartmentController.createManagementDepartment,
);
router.get('/');
router.get('/:managementDepartmentId');
router.patch('/:managementDepartmentId');
router.delete('/:managementDepartmentId');

export const ManagementDepartmentRoutes = router;
