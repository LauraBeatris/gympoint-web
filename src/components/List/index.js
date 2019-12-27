import React from 'react';
import PropTypes from 'prop-types';

import { Container, StyledTable } from './styles';

export default function List({ children }) {
  return (
    <Container>
      <StyledTable>{children}</StyledTable>
    </Container>
  );
}

List.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
