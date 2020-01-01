import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';

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
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getPlans() {
      try {
        setLoading(true);

        const response = await api.get('plans', { params: { page } });

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
  }, [page]);

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

      <Container>
        {loading && <p> Carregando... </p>}
        {plans.length > 0 && !loading ? (
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
              {plans.map((plan, key) => (
                <tr key={plan.id || key}>
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
        <Pagination onChange={p => setPage(p)} current={page} total={50} />
      </Container>
    </Container>
  );
}
