import React from 'react';
import PropTypes from 'prop-types';

import { Container, Title, ActionsContainer } from './styles';

export default function Actions({ title, children }) {
  return (
    <Container>
      <Title> {title} </Title>
      <ActionsContainer>{children}</ActionsContainer>
    </Container>
  );
}

Actions.defaultProps = {
  children: null,
};

Actions.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};
