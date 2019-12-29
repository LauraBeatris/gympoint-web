import React, { useEffect, useState } from 'react';
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
  const [student, setStudent] = useState({
    email: '',
    name: '',
    age: '',
    weight: '',
    height: '',
  });

  // Loading student data
  useEffect(() => {
    async function getStudent() {
      try {
        const response = await api
          .get(`students/${student_id}`)
          .then(res => setStudent(res.data));
        return response;
      } catch (err) {
        return toast(
          'Falha ao procurar os dados do aluno. Verifique os dados novamente',
          'error'
        );
      }
    }

    getStudent();
  }, [student_id]);

  async function handleSubmit(data) {
    try {
      await api
        .put(`students/${student_id}`, data)
        .then(res => setStudent(res.data));

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
      <StyledForm schema={schema.edit} onSubmit={handleSubmit}>
        <Action title="Edição de aluno">
          <Button to="/students">
            <MdKeyboardArrowLeft /> Voltar
          </Button>
          <Button type="submit" background="#CCCCCC">
            <MdDone /> Salvar
          </Button>
        </Action>
        <FormContainer>
          <Label htmlFor="name">NOME COMPLETO</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="John Joe"
            value={student && student.name}
            onChange={e => setStudent({ ...student, name: e.target.value })}
          />

          <Label htmlFor="email">ENDEREÇO DE E-MAIL</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="exemplo@gmail.com"
            value={student && student.email}
            onChange={e => setStudent({ ...student, email: e.target.value })}
          />

          <div>
            <div>
              <Label htmlFor="age">IDADE</Label>
              <Input
                type="text"
                name="age"
                id="age"
                value={student && student.age}
                onChange={e => setStudent({ ...student, age: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="weight">Peso (em kg)</Label>
              <Input
                type="text"
                name="weight"
                id="weight"
                value={student && student.weight}
                onChange={e =>
                  setStudent({ ...student, weight: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="height">Altura</Label>
              <Input
                type="text"
                name="height"
                id="height"
                value={student && student.height}
                onChange={e =>
                  setStudent({ ...student, height: e.target.value })
                }
              />
            </div>
          </div>
        </FormContainer>
      </StyledForm>
    </Container>
  );
}

StudentsEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape(),
  }).isRequired,
};
