import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import List from '~/components/List';

import api from '~/services/api';
import toast from '~/services/toast';
import { Container } from './styles';

export default function StudentsList() {
  const token = useSelector(state => state.auth.token);

  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getStudents() {
      try {
        setLoading(true);
        const response = filter
          ? await api.get('students', {
              params: { q: filter },
              headers: { Authentication: `Bearer ${token}` },
            })
          : await api.get('students');

        return setStudents(response.data);
      } catch (err) {
        return toast('Erro na listagem de aluno.', 'error');
      } finally {
        setLoading(false);
      }
    }

    getStudents();
  }, [filter, token]);

  async function handleDelete(id) {
    try {
      await api.delete(`/students/${id}`);
      toast('Aluno deletado com sucesso', 'success');

      return setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    } catch (err) {
      if (err.response.data) {
        return toast(err.response.data.messageContent, 'error');
      }
      return toast('Erro na deleção do aluno.', 'error');
    }
  }

  return (
    <Container>
      <Action title="Gerenciando alunos">
        <Button to="/students/register">
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
                  <div>
                    <Link to={`/students/${student.id}/edit`} className="blue">
                      {' '}
                      Editar{' '}
                    </Link>
                    <button
                      type="button"
                      className="red"
                      onClick={() => handleDelete(student.id)}
                    >
                      {' '}
                      Apagar{' '}
                    </button>
                  </div>
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
