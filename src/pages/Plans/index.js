import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import List from '~/components/List';

import api from '~/services/api';
import toast from '~/services/toast';

import { formatMoney } from '~/util/format';
import { Container } from './styles';

export default function PlansList() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPlans() {
      try {
        setLoading(true);

        const response = await api.get('plans');

        const data = response.data.map(plan => ({
          ...plan,
          formattedPrice: formatMoney(plan.price),
          formattedDuration:
            plan.duration > 1
              ? `${plan.duration} meses`
              : `${plan.duration} mês`,
        }));

        return setPlans(data);
      } catch (err) {
        return toast('Erro na listagem de planos.', 'error');
      } finally {
        setLoading(false);
      }
    }

    getPlans();
  }, []);

  async function handleDelete(id) {
    const result = window.confirm('Desejar deletar esse plano?');
    if (result) {
      try {
        await api.delete(`plans/${id}`);
        toast('Plano deletado com sucesso', 'success');

        return setTimeout(() => {
          window.location.reload(false);
        }, 2000);
      } catch (err) {
        if (err.response.data.messageContent) {
          return toast(err.response.data.messageContent, 'error');
        }
        return toast('Erro na deleção do plano.', 'error');
      }
    }
    return false;
  }

  return (
    <Container>
      <Helmet>
        <title> Gympoint | Planos </title>
      </Helmet>
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
                  <div>
                    <Link to={`/plans/${plan.id}/edit`} className="blue">
                      {' '}
                      Editar{' '}
                    </Link>
                    <button
                      type="button"
                      className="red"
                      onClick={() => handleDelete(plan.id)}
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
        !loading && <p> Sem planos no momento </p>
      )}
      {loading && <p> Carregando... </p>}
    </Container>
  );
}
