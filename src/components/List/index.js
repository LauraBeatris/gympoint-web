import React from 'react';
import PropTypes from 'prop-types';

import { Container, StyledTable, TableWrapper } from './styles';

export default function List({ children, loading }) {
  return (
    <Container>
      {!loading ? (
        <TableWrapper>
          <StyledTable>{children}</StyledTable>
        </TableWrapper>
      ) : (
        <p className="loading">Carregando...</p>
      )}
    </Container>
  );
}

List.defaultProps = {
  loading: false,
};

List.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  loading: PropTypes.bool,
};
