import React from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Label from '~/components/Label';

import api from '~/services/api';
import { StyledForm, Container } from './styles';

export default function StudentsRegister() {
  return (
    <Container>
      <Action title="Cadastro de aluno">
        <Button to="/students" action={() => {}}>
          <MdKeyboardArrowLeft /> Voltar
        </Button>
        <Button background="#CCCCCC" action={() => {}}>
          <MdDone /> Salvar
        </Button>
      </Action>
      <StyledForm>
        <Label htmlFor="name">NOME COMPLETO</Label>
        <Input type="text" name="name" id="name" placeholder="John Joe" />

        <Label htmlFor="email">ENDEREÇO DE E-MAIL</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="exemplo@gmail.com"
        />

        <div>
          <div>
            <Label htmlFor="age">IDADE</Label>
            <Input type="number" name="age" id="age" />
          </div>

          <div>
            <Label htmlFor="weight">Peso (em kg)</Label>
            <Input type="number" name="weight" id="weight" />
          </div>

          <div>
            <Label htmlFor="height">Altura</Label>
            <Input type="number" name="height" id="height" />
          </div>
        </div>
      </StyledForm>
    </Container>
  );
}
