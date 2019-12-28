import React from 'react';
import PropTypes from 'prop-types';
import { StyledInput, InputWrapper } from './styles';

export default function Input({
  onChange,
  type,
  name,
  placeholder,
  icon: Icon,
}) {
  return (
    <>
      {!Icon ? (
        <StyledInput
          onChange={onChange}
          type={type}
          name={name}
          placeholder={placeholder}
        />
      ) : (
        <InputWrapper>
          <Icon />
          <StyledInput
            onChange={onChange}
            type={type}
            name={name}
            placeholder={placeholder}
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
};

Input.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};
