import React from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Label from '~/components/Label';

import api from '~/services/api';
import { StyledForm, Container } from './styles';

export default function RegistrationsRegister() {
  return (
    <Container>
      <Action title="Cadastro de matrícula">
        <Button to="/registrations" action={() => {}}>
          <MdKeyboardArrowLeft /> Voltar
        </Button>
        <Button background="#CCCCCC" action={() => {}}>
          <MdDone /> Salvar
        </Button>
      </Action>
      <StyledForm>
        {/* Select Async */}
        <Label htmlFor="name">ALUNO</Label>
        <Input type="text" name="name" id="name" placeholder="John Joe" />

        <div>
          {/* Select Async */}
          <div>
            <Label htmlFor="age">PLANO</Label>
            <Input type="number" name="age" id="age" />
          </div>

          <div>
            <Label htmlFor="start_date">DATA DE INÍCIO</Label>
            <Input type="start_date" name="start_date" id="start_date" />
          </div>

          <div>
            <Label htmlFor="end_date">DATA DE TÉRMINO</Label>
            <Input type="end_date" name="end_date" id="end_date" />
          </div>
          <div>
            <Label htmlFor="price">VALOR FINAL</Label>
            <Input type="number" name="price" id="price" />
          </div>
        </div>
      </StyledForm>
    </Container>
  );
}
