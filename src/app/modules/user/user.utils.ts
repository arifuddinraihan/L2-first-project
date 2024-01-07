import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// STUDENT USER UTILS
const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent?.id : undefined;
};

// Generate Student Id , Year Semester 4 digit code
export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  let currentId = (0).toString(); // by default 0000
  const lastStudentId = await findLastStudent();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); // 01 Semester code
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4); // 2030 Semester Year
  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

// FACULTY USER UTILS
const findLastFaculty = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id ? lastFaculty?.id : undefined;
};

// Generate Faculty Id , *F* 4 digit code
export const generateFacultyId = async () => {
  // first time 0000
  let currentId = (0).toString(); // by default 0000
  const lastFacultyId = await findLastFaculty();

  if (lastFacultyId) {
    // pulling out the id from string value which will start after no-2 characters in the string 
    currentId = lastFacultyId?.substring(2); // 0001 Demo return
  }
  // incrementing the pulled number and also setting it to string for 4 characters which will start with '0's
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;
  return incrementId;
};

// Admin USER UTILS
const findLastAdmin = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id ? lastAdmin?.id : undefined;
};

// Generate Admin Id , *A* 4 digit code
export const generateAdminId = async () => {
  // first time 0000
  let currentId = (0).toString(); // by default 0000
  const lastAdminId = await findLastAdmin();

  if (lastAdminId) {
    // pulling out the id from string value which will start after no-2 characters in the string 
    currentId = lastAdminId.substring(2); // 0001 Demo return
  }
  // incrementing the pulled number and also setting it to string for 4 characters which will start with '0's
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
