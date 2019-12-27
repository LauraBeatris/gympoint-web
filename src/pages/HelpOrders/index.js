import React from 'react';
import Action from '~/components/Actions';
import List from '~/components/List';

import { Container } from './styles';

export default function HelpOrdersList() {
  return (
    <Container>
      <Action title="Pedidos de auxílio" />
      <List>
        <thead>
          <tr>
            <th> Aluno </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lennert Nijenbijvank</td>
            <td className="actions">
              <button type="button" className="blue">
                {' '}
                Responder{' '}
              </button>
            </td>
          </tr>
          <tr>
            <td>Lennert Nijenbijvank</td>
            <td className="actions">
              <button type="button" className="blue">
                {' '}
                Responder{' '}
              </button>
            </td>
          </tr>
          <tr>
            <td>Lennert Nijenbijvank</td>
            <td className="actions">
              <button type="button" className="blue">
                {' '}
                Responder{' '}
              </button>
            </td>
          </tr>
        </tbody>
      </List>
    </Container>
  );
}
