import React from 'react';
import PropTypes from 'prop-types';
import { StyledInput, InputWrapper } from './styles';

export default function Input({
  onChange,
  type,
  name,
  placeholder,
  readOnly,
  icon: Icon,
  background,
  value,
}) {
  if (typeof value === 'number' || value)
    return (
      <StyledInput
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        background={background}
        value={value}
      />
    );

  return (
    <>
      {!Icon ? (
        <StyledInput
          onChange={onChange}
          type={type}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          background={background}
        />
      ) : (
        <InputWrapper>
          <Icon />
          <StyledInput
            onChange={onChange}
            type={type}
            name={name}
            placeholder={placeholder}
            background={background}
          />
        </InputWrapper>
      )}
    </>
  );
}

Input.defaultProps = {
  onChange: () => {},
  placeholder: '',
  icon: null,
  readOnly: false,
  background: '#FFFF',
  value: null,
};

Input.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  readOnly: PropTypes.bool,
  background: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
