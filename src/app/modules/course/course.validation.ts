import { z } from 'zod';

const preRequisiteCoursesValidationSchema = z.object({
  course: z.string({
    invalid_type_error: 'course id must be string',
  }),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'title must be string',
      required_error: 'title is required',
    }),
    prefix: z.string({
      invalid_type_error: 'prefix must be string',
      required_error: 'prefix is required',
    }),
    code: z.number({
      invalid_type_error: 'code must be number',
      required_error: 'code is required',
    }),
    credits: z.number({
      invalid_type_error: 'credits must be number',
      required_error: 'credits are required',
    }),
    preRequisiteCourses: z
      .array(preRequisiteCoursesValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: 'title must be string',
        required_error: 'title is required',
      })
      .optional(),
    prefix: z
      .string({
        invalid_type_error: 'prefix must be string',
        required_error: 'prefix is required',
      })
      .optional(),
    code: z
      .number({
        invalid_type_error: 'code must be number',
        required_error: 'code is required',
      })
      .optional(),
    credits: z
      .number({
        invalid_type_error: 'credits must be number',
        required_error: 'credits are required',
      })
      .optional(),
    preRequisiteCourses: z
      .array(preRequisiteCoursesValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
