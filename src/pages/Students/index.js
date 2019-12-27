import React from 'react';
import Action from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';

import { Container } from './styles';

export default function StudentsList() {
  return (
    <Container>
      <Action title="Gerenciando alunos">
        <Button action={() => {}}>Cadastrar</Button>
        <Input type="text" name="q" placeholder="Buscar aluno" />
      </Action>
    </Container>
  );
}
