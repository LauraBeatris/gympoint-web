import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { MdAdd } from 'react-icons/md';

import locale from 'date-fns/locale/pt-BR';
import Action from '~/components/Actions';
import Button from '~/components/Button';
import List from '~/components/List';

import api from '~/services/api';
import { Container } from './styles';

export default function RegistrationsList() {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getRegistrations() {
      try {
        setLoading(true);
        setError(false);

        const response = await api.get('registrations');
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

        setRegistrations(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getRegistrations();
  }, []);

  return (
    <Container>
      <Action title="Gerenciando matrículas">
        <Button to="/registrations/register" action={() => {}}>
          <MdAdd color="#fff" /> Cadastrar
        </Button>{' '}
      </Action>
      {registrations.length > 0 ? (
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
        !loading && <p> Sem matrículas no momento </p>
      )}
    </Container>
  );
}
