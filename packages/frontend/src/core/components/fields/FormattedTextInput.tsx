import cc from "classnames";
import React, { ReactNode } from "react";
import { FC } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import InputMask from "react-input-mask";

import { getErrorMessage } from "./helpers";

const FormattedTextInput: FC<{
  register: UseFormRegisterReturn<any>;
  placeholder: string;
  errors: any;
  mask: string;
  maskChar?: string;
  type?: string;
  loading?: boolean;
  label?: ReactNode;
  showRequired?: boolean;
  helpText?: ReactNode;
  className?: string;
}> = ({
  errors,
  loading,
  register,
  showRequired,
  placeholder,
  mask,
  maskChar,
  type = "text",
  label,
  helpText,
  className,
}) => {
  const error = errors[register.name] as FieldError;

  return (
    <div className={cc("form-control w-full", className)}>
      {label && (
        <label className="label">
          <span className="label-text-alt">
            {label}
            {showRequired ? " *" : ""}
          </span>
        </label>
      )}
      <InputMask
        type={type}
        placeholder={`${placeholder}${showRequired ? "*" : ""}`}
        className={cc({ ["input-error"]: !!error }, "input input-bordered")}
        disabled={loading}
        mask={mask}
        maskChar={maskChar}
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

export default FormattedTextInput;
