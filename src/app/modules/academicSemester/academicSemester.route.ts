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
router.patch(
  '/:semesterId',
  AcademicSemesterControllers.updateSingleAcademicSemester,
);

export const AcademicSemesterRoutes = router;