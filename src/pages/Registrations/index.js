import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { parseISO, format } from 'date-fns';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';

import locale from 'date-fns/locale/pt-BR';
import Action from '~/components/Actions';
import Button from '~/components/Button';
import List from '~/components/List';

import api from '~/services/api';
import toast from '~/services/toast';

import { Container } from './styles';

export default function RegistrationsList() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getRegistrations() {
      try {
        setLoading(true);

        const response = await api.get('registrations', { params: { page } });
        const data = response.data.map(registration => ({
          ...registration,
          formattedStartDate: format(
            parseISO(registration.start_date),
            "dd 'de' MMMM 'de' yyy",
            { locale }
          ),
          formattedEndDate: format(
            parseISO(registration.end_date),
            "dd 'de' MMMM 'de' yyy",
            { locale }
          ),
        }));

        return setRegistrations(data);
      } catch (err) {
        return toast('Erro na listagem de matrículas.', 'error');
      } finally {
        setLoading(false);
      }
    }

    getRegistrations();
  }, [page]);

  async function handleDelete(id) {
    const result = window.confirm('Desejar deletar essa matrícula?');
    if (result) {
      try {
        await api.delete(`/registrations/${id}`);
        toast('Matrícula deletada com sucesso', 'success');

        return setTimeout(() => {
          window.location.reload(false);
        }, 2000);
      } catch (err) {
        if (err.response.data) {
          return toast(err.response.data.messageContent, 'error');
        }
        return toast('Erro na deleção da matrícula.', 'error');
      }
    }
    return false;
  }

  return (
    <Container>
      <Helmet>
        <title> GymPoint | Matrículas </title>
      </Helmet>
      <Action title="Gerenciando matrículas">
        <Button to="/registrations/register">
          <MdAdd color="#fff" /> Cadastrar
        </Button>{' '}
      </Action>

      <Container>
        {loading && <p> Carregando... </p>}

        {registrations.length > 0 && !loading ? (
          <List>
            <thead>
              <tr>
                <th> Aluno </th>
                <th className="center"> Plano </th>
                <th className="center"> Início </th>
                <th className="center"> Término </th>
                <th className="center"> Ativa </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {registrations.map(registration => (
                <tr key={registration.id}>
                  <td>{registration.student.name}</td>
                  <td className="center">{registration.plan.title}</td>
                  <td className="center">{registration.formattedStartDate}</td>
                  <td className="center">{registration.formattedEndDate}</td>
                  <td className="center">
                    {registration.active ? 'Sim' : 'Não'}
                  </td>

                  <td className="actions">
                    <div>
                      <Link
                        to={`/registrations/${registration.id}/edit`}
                        className="blue"
                      >
                        {' '}
                        Editar{' '}
                      </Link>
                      <button
                        type="button"
                        className="red"
                        onClick={() => handleDelete(registration.id)}
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
          !loading && <p> Sem matrículas no momento </p>
        )}
        <Pagination onChange={p => setPage(p)} current={page} total={50} />
      </Container>
    </Container>
  );
}
