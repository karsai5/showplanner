/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export const getErrorMessage = (
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
) => {
  if (error?.type === 'required') {
    return 'Value required';
  }
  if (error?.message && typeof error.message === 'string') {
    return error.message;
  }
  return `Field invalid: ${error?.type}`;
};
