import React from 'react';
import Action from '~/components/Actions';
import Button from '~/components/Button';

import { Container } from './styles';

export default function PlansList() {
  return (
    <Container>
      <Action title="Gerenciando planos">
        <Button action={() => {}}>Cadastrar</Button>
      </Action>
    </Container>
  );
}
