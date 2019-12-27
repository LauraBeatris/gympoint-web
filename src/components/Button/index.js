import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './styles';

export default function Button({ background, color, children, action }) {
  return (
    <StyledButton background={background} color={color} onClick={action}>
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  background: '#EE4D64',
  color: '#FFF',
};

Button.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
