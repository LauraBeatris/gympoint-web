import React, { useEffect, useState } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import List from '~/components/List';

import api from '~/services/api';
import { Container } from './styles';

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getStudents() {
      try {
        setLoading(true);
        setError(false);

        const response = filter
          ? await api.get('students', { params: { q: filter } })
          : await api.get('students');

        setStudents(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getStudents();
  }, [filter]);

  return (
    <Container>
      <Action title="Gerenciando alunos">
        <Button to="/students/register" action={() => {}}>
          <MdAdd color="#fff" /> Cadastrar
        </Button>
        <Input
          icon={MdSearch}
          type="text"
          name="q"
          placeholder="Buscar aluno"
          onChange={e => setFilter(e.target.value)}
        />
      </Action>
      {students.length > 0 ? (
        <List>
          <thead>
            <tr>
              <th> Nome </th>
              <th> E-mail </th>
              <th className="center"> Idade </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td className="center">{student.age}</td>
                <td className="actions">
                  <button type="button" className="blue">
                    {' '}
                    Editar{' '}
                  </button>
                  <button type="button" className="red">
                    {' '}
                    Apagar{' '}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </List>
      ) : (
        !loading && <p> Sem estudantes no momento </p>
      )}
    </Container>
  );
}
