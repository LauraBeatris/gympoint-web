import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { StyledInput } from './styles';

export default function MaskInput({ name, inputMask, maskChar, defaultValue }) {
  const { fieldName, registerField, error } = useField(name);
  const [value, setValue] = useState(defaultValue || '');
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'props.value',
      });
    }
    }, [ref.current]); // eslint-disable-line

  function handleChange(e) {
    return setValue(e.target.value);
  }

  return (
    <>
      <StyledInput
        type="text"
        id={fieldName}
        name={fieldName}
        mask={inputMask}
        maskChar={maskChar}
        value={value}
        onChange={handleChange}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

MaskInput.defaultProps = {
  defaultValue: '',
  maskChar: '_',
};

MaskInput.propTypes = {
  name: PropTypes.string.isRequired,
  inputMask: PropTypes.string.isRequired,
  maskChar: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
