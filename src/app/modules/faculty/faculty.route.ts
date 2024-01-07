import express from 'express';
import validateRequest from '../../middlewares/validation.Request';
import { FacultyControllers } from './faculty.controller';
import { FacultyValidations } from './faculty.validation';

const router = express.Router();

//
router.get('/:facultyId', FacultyControllers.getSingleFaculty);

//
router.patch(
  '/:facultyId',
  validateRequest(FacultyValidations.updatedFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);

//
router.delete('/:facultyId', FacultyControllers.deleteSingleFaculty);

//
router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
