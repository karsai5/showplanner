import cc from "classnames";
import { FC } from "react";
import { FieldError, FieldErrors, UseFormRegisterReturn } from "react-hook-form";

import { getErrorMessage } from "./helpers";

const Input: FC<{
  register: UseFormRegisterReturn;
  label: string;
  errors: FieldErrors;
  helpText?: string;
}> = ({ errors, register, helpText, label }) => {
  const name = register.name;
  const error = errors[name] as FieldError;
  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start">
        <input
          type="checkbox"
          className={cc({ ["checkbox-error"]: !!error }, "checkbox")}
          {...register}
        />
        <span className="label-text pl-2">{label}</span>
      </label>

      <label className="label">
        {!!error && (
          <span className="label-text-alt text-warning">
            {getErrorMessage(error)}
          </span>
        )}
        {!!helpText && !error && (
          <span className="label-text-alt">{helpText}</span>
        )}
      </label>
    </div>
  );
};

export default Input;
