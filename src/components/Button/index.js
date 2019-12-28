import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton, StyledLink } from './styles';

export default function Button({ to, background, color, children, action }) {
  return to ? (
    <StyledLink to={to} background={background} color={color} onClick={action}>
      {children}
    </StyledLink>
  ) : (
    <StyledButton background={background} color={color} onClick={action}>
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  background: '#EE4D64',
  color: '#FFF',
  to: '',
};

Button.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  action: PropTypes.func.isRequired,
  to: PropTypes.string,
};
