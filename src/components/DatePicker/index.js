import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@rocketseat/unform';

import { StyledDatePicker } from './styles';

export default function DatePicker({
  name,
  placeholder,
  minDate,
  onChange,
  value,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  if (value)
    return (
      <StyledDatePicker
        name={fieldName}
        selected={value || selected || minDate}
        onChange={date => {
          onChange(date);
          setSelected(date);
        }}
        dateFormat="dd/MM/yyyy"
        ref={ref}
        todayButton="Hoje"
        placeholderText={placeholder}
        minDate={minDate}
        {...rest}
      />
    );

  return (
    <>
      <StyledDatePicker
        name={fieldName}
        selected={selected || minDate}
        onChange={date => {
          onChange(date);
          setSelected(date);
        }}
        dateFormat="dd/MM/yyyy"
        ref={ref}
        todayButton="Hoje"
        placeholderText={placeholder}
        minDate={minDate}
      />
      {error && <span>{error}</span>}
    </>
  );
}
