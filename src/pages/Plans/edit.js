import React from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Label from '~/components/Label';

import api from '~/services/api';
import { StyledForm, Container } from './styles';

export default function PlansEdit() {
  return (
    <Container>
      <Action title="Edição de plano">
        <Button to="/plans">
          <MdKeyboardArrowLeft /> Voltar
        </Button>
        <Button type="submit" background="#CCCCCC">
          <MdDone /> Salvar
        </Button>
      </Action>
      <StyledForm>
        <Label htmlFor="title">TÍTULO DO PLANO</Label>
        <Input type="text" name="title" id="title" />

        <div>
          <div>
            <Label htmlFor="duration">DURAÇÃO (em meses)</Label>
            <Input type="number" name="duration" id="duration" />
          </div>

          <div>
            <Label htmlFor="price">PREÇO MENSAL</Label>
            <Input type="price" name="price" id="price" />
          </div>

          <div>
            <Label htmlFor="total-price">PREÇO TOTAL</Label>
            <Input type="number" name="total-price" id="total-price" />
          </div>
        </div>
      </StyledForm>
    </Container>
  );
}
