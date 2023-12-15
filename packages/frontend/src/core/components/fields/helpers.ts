import { FieldError } from "react-hook-form";

export const getErrorMessage = (error: FieldError) => {
  if (error.type === "required") {
    return "Value required";
  }
  if (error.message) {
    return error.message;
  }
  return `Field invalid: ${error.type}`;
};
