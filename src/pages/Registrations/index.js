import React from 'react';
import Action from '~/components/Actions';
import Button from '~/components/Button';

import { Container } from './styles';

export default function RegistrationsList() {
  return (
    <Container>
      <Action title="Gerenciando matrículas">
        <Button action={() => {}}>Cadastrar</Button>
      </Action>
    </Container>
  );
}
