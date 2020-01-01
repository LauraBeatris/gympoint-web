import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
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

export default function StudentsEdit({ match }) {
  const { params } = match;
  const { student_id } = params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const [loading, setLoading] = useState(false);

  // Loading student data
  useEffect(() => {
    async function getStudent() {
      try {
        setLoading(true);
        const response = await api.get(`students/${student_id}`);

        setName(response.data.name);
        setAge(response.data.age);
        setEmail(response.data.email);
        setWeight(response.data.weight);
        setHeight(response.data.height);
        return response;
      } catch (err) {
        return toast(
          'Falha ao procurar os dados do aluno. Verifique os dados novamente',
          'error'
        );
      } finally {
        setLoading(false);
      }
    }

    getStudent();
  }, [student_id]);

  async function handleSubmit(data) {
    try {
      await api.put(`students/${student_id}`, data);

      toast('Aluno atualizado com sucesso', 'success');

      return history.push('/students');
    } catch (err) {
      if (err.response.data) {
        return toast(err.response.data.messageContent, 'error');
      }
      return toast('Erro na atualização do aluno. Verifique os dados', 'error');
    }
  }

  return (
    <Container>
      <Helmet>
        <title> Gympoint | Edição de aluno </title>
      </Helmet>

      <StyledForm schema={schema.edit} onSubmit={handleSubmit}>
        <Action title="Edição de aluno">
          <Button to="/students">
            <MdKeyboardArrowLeft /> Voltar
          </Button>
          <Button type="submit" background="#CCCCCC">
            <MdDone /> Salvar
          </Button>
        </Action>
        {!loading ? (
          <FormContainer>
            <Label htmlFor="name">NOME COMPLETO</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="John Joe"
              onChange={e => setName(e.target.value)}
              value={name}
            />

            <Label htmlFor="email">ENDEREÇO DE E-MAIL</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="exemplo@gmail.com"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />

            <div>
              <div>
                <Label htmlFor="age">IDADE</Label>
                <Input
                  type="text"
                  name="age"
                  id="age"
                  onChange={e => setAge(e.target.value)}
                  value={age}
                />
              </div>

              <div>
                <Label htmlFor="weight">Peso (em kg)</Label>
                <Input
                  type="text"
                  name="weight"
                  id="weight"
                  onChange={e => setWeight(e.target.value)}
                  value={weight}
                />
              </div>

              <div>
                <Label htmlFor="height">Altura</Label>
                <Input
                  type="text"
                  name="height"
                  id="height"
                  onChange={e => setHeight(e.target.value)}
                  value={height}
                />
              </div>
            </div>
          </FormContainer>
        ) : (
          <p> Carregando estudante... </p>
        )}
      </StyledForm>
    </Container>
  );
}

StudentsEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape(),
  }).isRequired,
};
