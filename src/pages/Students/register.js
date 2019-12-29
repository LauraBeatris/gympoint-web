import React from 'react';
import Helmet from 'react-helmet';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Label from '~/components/Label';

import api from '~/services/api';
import history from '~/services/history';
import toast from '~/services/toast';
import { FormContainer, StyledForm, Container } from './styles';

import schema from '~/validators/student';

export default function StudentsRegister() {
  async function handleSubmit(data) {
    try {
      await api.post('students', data);

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
              <Input type="text" name="weight" id="weight" />
            </div>

            <div>
              <Label htmlFor="height">Altura</Label>
              <Input type="text" name="height" id="height" />
            </div>
          </div>
        </FormContainer>
      </StyledForm>
    </Container>
  );
}
