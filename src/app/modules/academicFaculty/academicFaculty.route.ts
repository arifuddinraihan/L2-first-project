import express from 'express';
import validateRequest from '../../middlewares/validation.Request';
import { AcademicFacultyValidations } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.get(
  '/',
  AcademicFacultyControllers.getAllAcademicFaculty,
);
router.get(
  '/:facultyId',
  AcademicFacultyControllers.getSingleAcademicFaculty,
);
router.patch(
  '/:facultyId',
  validateRequest(AcademicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyControllers.updatedSingleAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
