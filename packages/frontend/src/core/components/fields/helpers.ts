import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
) => {
  if (error?.type === "required") {
    return "Value required";
  }
  if (error?.message && typeof error.message === "string") {
    return error.message;
  }
  return `Field invalid: ${error?.type}`;
};
