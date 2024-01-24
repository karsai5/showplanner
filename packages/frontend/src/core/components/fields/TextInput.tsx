import cc from "classnames";
import { FC } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { getErrorMessage } from "./helpers";

const Input: FC<{
  register: UseFormRegisterReturn<any>;
  placeholder?: string;
  label?: string;
  errors: any;
  loading?: boolean;
  showRequired?: boolean;
  type?: string;
  helpText?: string;
  className?: string;
}> = ({
  errors,
  loading,
  register,
  showRequired,
  placeholder,
  type = "text",
  helpText,
  label,
  className,
}) => {
  const name = register.name;
  const id = `input-${name}`;
  const error = errors[name] as FieldError;
  return (
    <div className={cc("form-control w-full", className)}>
      {label && (
        <label className="label" htmlFor={id}>
          <span className="label-text-alt">
            {label}
            {showRequired ? " *" : ""}
          </span>
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={`${placeholder}${showRequired ? " *" : ""}`}
        className={cc({ ["input-error"]: !!error }, "input input-bordered")}
        disabled={loading}
        {...register}
      />
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
