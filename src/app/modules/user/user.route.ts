import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validation.Request';
import { createStudentValidationSchema } from '../student/student.validation';
import { FacultyValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';

const router = express.Router();

// create-student route which will auto create the role and id for student
router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

// create-faculty route which will auto create the role and id for faculty
router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

// create-admin route which will auto create the role and id for Admin
router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
