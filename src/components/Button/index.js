import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton, StyledLink } from './styles';

export default function Button({ to, type, background, color, children }) {
  return to ? (
    <StyledLink to={to} background={background} color={color}>
      {children}
    </StyledLink>
  ) : (
    <StyledButton type={type} background={background} color={color}>
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  background: '#EE4D64',
  color: '#FFF',
  to: '',
  type: '',
};

Button.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  to: PropTypes.string,
  type: PropTypes.string,
};
