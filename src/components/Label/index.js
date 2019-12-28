import React from 'react';
import PropTypes from 'prop-types';

import { StyledLabel } from './styles';

export default function Label({ children }) {
  return <StyledLabel>{children}</StyledLabel>;
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
};
