import React, { useEffect, useState } from 'react';
import Action from '~/components/Actions';
import List from '~/components/List';

import api from '~/services/api';
import { Container } from './styles';

export default function HelpOrdersList() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getHelpOrders() {
      try {
        setLoading(true);
        setError(false);

        const response = await api.get('help-orders/pending');

        setHelpOrders(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getHelpOrders();
  }, []);

  return (
    <Container>
      <Action title="Pedidos de auxílio" />
      {helpOrders.length > 0 ? (
        <List>
          <thead>
            <tr>
              <th> Aluno </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {helpOrders.map(helpOrder => (
              <tr key={helpOrder.id}>
                <td>{helpOrder.student.name}</td>
                <td className="actions">
                  <button type="button" className="blue">
                    {' '}
                    Responder{' '}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </List>
      ) : (
        !loading && <p> Sem pedidos de auxílio no momento </p>
      )}
    </Container>
  );
}
