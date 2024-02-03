import cc from "classnames";
import { FC } from "react";
import {
  FieldError,
  FieldErrors,
  UseFormRegisterReturn,
} from "react-hook-form";

import { getErrorMessage } from "./helpers";

const TextArea: FC<{
  register: UseFormRegisterReturn;
  placeholder: string;
  errors: FieldErrors;
  loading?: boolean;
  showRequired?: boolean;
  className?: string;
}> = ({ errors, loading, register, showRequired, placeholder, className }) => {
  const name = register.name;
  const error = errors[name] as FieldError;
  return (
    <div className="form-control w-full">
      <textarea
        placeholder={`${placeholder}${showRequired ? "*" : ""}`}
        className={cc(
          { ["input-error"]: !!error },
          "input input-bordered",
          className
        )}
        disabled={loading}
        {...register}
      />
      {!!error && (
        <label className="label">
          <span className="label-text-alt text-warning">
            {getErrorMessage(error)}
          </span>
        </label>
      )}
    </div>
  );
};

export default TextArea;
