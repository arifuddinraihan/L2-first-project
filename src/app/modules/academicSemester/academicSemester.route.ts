import express from 'express';
import validateRequest from '../../middlewares/validation.Request';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get('/', AcademicSemesterControllers.getAllAcademicSemester);
router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
);
// Patch route for Academic Semester
router.patch(
  '/:semesterId',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateSingleAcademicSemester,
);

export const AcademicSemesterRoutes = router;
