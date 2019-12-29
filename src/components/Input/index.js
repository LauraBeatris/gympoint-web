import React from 'react';
import PropTypes from 'prop-types';
import { StyledInput, InputWrapper } from './styles';

export default function Input({
  onChange,
  name,
  placeholder,
  readOnly,
  icon: Icon,
  background,
  value,
  ...rest
}) {
  if (typeof value === 'number' || value)
    return (
      <StyledInput
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        background={background}
        value={value}
        {...rest}
      />
    );

  return (
    <>
      {!Icon ? (
        <StyledInput
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          background={background}
          {...rest}
        />
      ) : (
        <InputWrapper>
          <Icon />
          <StyledInput
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            background={background}
            {...rest}
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
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  readOnly: PropTypes.bool,
  background: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
