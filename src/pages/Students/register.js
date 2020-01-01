import React from 'react';
import Helmet from 'react-helmet';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import MaskInput from '~/components/MaskInput';
import Label from '~/components/Label';

import api from '~/services/api';
import history from '~/services/history';
import toast from '~/services/toast';
import { FormContainer, StyledForm, Container } from './styles';

import schema from '~/validators/student';
import removeMask from '~/helpers/removeMask';

export default function StudentsRegister() {
  async function handleSubmit({ name, email, age, weight, height }) {
    if (!weight) {
      return toast('Por favor, digite o peso do aluno antes de cadastra-lo');
    }
    if (!height) {
      return toast('Por favor, digite a altura do aluno antes de cadastra-lo');
    }

    try {
      await api.post('students', {
        name,
        email,
        age,
        weight: removeMask(weight),
        height: removeMask(height),
      });

      toast('Aluno cadastrado com sucesso', 'success');

      return history.push('/students');
    } catch (err) {
      if (err.response.data) {
        return toast(err.response.data.messageContent, 'error');
      }
      return toast('Erro no cadastro de aluno. Verifique os dados', 'error');
    }
  }

  return (
    <Container>
      <Helmet>
        <title> Gympoint | Cadastro de aluno </title>
      </Helmet>
      <StyledForm schema={schema.register} onSubmit={handleSubmit}>
        <Action title="Cadastro de aluno">
          <Button to="/students">
            <MdKeyboardArrowLeft /> Voltar
          </Button>
          <Button type="submit" background="#CCCCCC">
            <MdDone /> Salvar
          </Button>
        </Action>
        <FormContainer>
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
              <Input type="text" name="age" id="age" />
            </div>

            <div>
              <Label htmlFor="weight">Peso (em kg)</Label>
              <MaskInput
                name="weight"
                id="weight"
                maskChar="0"
                inputMask="99,9kg"
              />
            </div>

            <div>
              <Label htmlFor="height">Altura</Label>
              <MaskInput
                name="height"
                id="height"
                inputMask="9,99m"
                maskChar="0"
              />
            </div>
          </div>
        </FormContainer>
      </StyledForm>
    </Container>
  );
}
