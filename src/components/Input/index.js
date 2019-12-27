import React from 'react';
import PropTypes from 'prop-types';
import { StyledInput } from './styles';

export default function Input({ onChange, type, name, placeholder }) {
  return (
    <StyledInput
      onChange={onChange}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
}

Input.defaultProps = {
  onChange: () => {},
  placeholder: '',
};

Input.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};
