import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import List from '~/components/List';

import api from '~/services/api';
import { formatMoney } from '~/util/format';
import { Container } from './styles';

export default function PlansList() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPlans() {
      try {
        setLoading(true);
        setError(false);

        const response = await api.get('plans');

        const data = response.data.map(plan => ({
          ...plan,
          formattedPrice: formatMoney(plan.price),
          formattedDuration:
            plan.duration > 1
              ? `${plan.duration} meses`
              : `${plan.duration} mês`,
        }));

        setPlans(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getPlans();
  }, []);
  return (
    <Container>
      <Action title="Gerenciando planos">
        <Button to="/plans/register">
          <MdAdd color="#fff" /> Cadastrar
        </Button>{' '}
      </Action>
      {plans.length > 0 ? (
        <List>
          <thead>
            <tr>
              <th> TÍTULO </th>
              <th className="center"> DURAÇÃO </th>
              <th className="center"> VALOR p/ MÊS </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td className="center">{plan.formattedDuration}</td>
                <td className="center">{plan.formattedPrice}</td>
                <td className="actions">
                  <Link to={`/plans/${plan.id}/edit`} className="blue">
                    {' '}
                    Editar{' '}
                  </Link>
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
        !loading && <p> Sem planos no momento </p>
      )}
    </Container>
  );
}
