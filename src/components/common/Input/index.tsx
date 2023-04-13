import React, {ChangeEvent, useRef } from "react";

import './Input.scss';

interface Props {
  label: string;
  value: string | undefined;
  type: 'text' | 'password';
  error?: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<Props> = ({label, value, name, error, type, onChange, onFocus}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  }

  const handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
    onFocus && onFocus(event);
  }

  return (
    <>
      <div className="input">
        <input
          className={`input__field ${error ? 'input__field-error' : ''}`}
          type={type}
          value={value}
          name={name}
          placeholder=' '
          onChange={handleChange}
          onFocus={handleFocus}
          ref={inputRef}
        />
        <span className="input__highlight"></span>
        <span className={`input__bar`}></span>
        <label className="input__label">{label}</label>
        {error && (
          <small className='input__error'>{error}</small>
        )}
      </div>
    </>
  )
}