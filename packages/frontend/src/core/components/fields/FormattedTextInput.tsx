import cc from 'classnames';
import React, { ReactNode } from 'react';
import { FC } from 'react';
import {
  FieldError,
  FieldErrors,
  UseFormRegisterReturn,
} from 'react-hook-form';
import InputMask from 'react-input-mask';

import { getErrorMessage } from './helpers';

const FormattedTextInput: FC<{
  register: UseFormRegisterReturn;
  placeholder: string;
  errors: FieldErrors;
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
  type = 'text',
  label,
  helpText,
  className,
}) => {
  const error = errors[register.name] as FieldError;
  const id = `input-${register.name}`;

  return (
    <div className={cc('form-control w-full', className)}>
      {label && (
        <label className="label" htmlFor={id}>
          <span className="label-text-alt">
            {label}
            {showRequired ? ' *' : ''}
          </span>
        </label>
      )}
      <InputMask
        id={id}
        type={type}
        placeholder={`${placeholder}${showRequired ? '*' : ''}`}
        className={cc({ ['input-error']: !!error }, 'input input-bordered')}
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
