import { TCourse } from './course.interface';
import { Course } from './course.model';

// Create Course into DB
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

// Get All course from DB
const getAllCoursesFromDB = async () => {
  const result = await Course.find().populate('preRequisiteCourses.course');
  return result;
};

// Get single course from DB
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

// Update single course int0 DB
const updatedSingleCourseIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('preRequisiteCourses.course');
  return result;
};

// Delete single course from DB
const deleteSingleCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updatedSingleCourseIntoDB,
  deleteSingleCourseFromDB,
};
