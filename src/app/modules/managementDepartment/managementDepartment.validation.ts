import { z } from 'zod';

const createMultipleManagementDepartmentValidationSchema = z.object({
  body: z.array(
    z.object({
      name: z.string({
        invalid_type_error: 'Management Department name must be string',
        required_error: 'Management Department name is required',
      }),
    }),
  ),
});

export const ManagementDepartmentValidations = {
  createMultipleManagementDepartmentValidationSchema,
};
