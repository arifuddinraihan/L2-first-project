import express from 'express';
import validateRequest from '../../middlewares/validation.Request';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';

const router = express.Router();

//
router.get('/:adminId', AdminControllers.getSingleAdmin);

//
router.patch(
  '/:adminId',
  validateRequest(AdminValidations.updatedAdminValidationSchema),
  AdminControllers.updateSingleAdmin,
);

//
router.delete('/:adminId', AdminControllers.deleteSingleAdmin);

//
router.get('/', AdminControllers.getAllAdmins);

export const AdminRoutes = router;
