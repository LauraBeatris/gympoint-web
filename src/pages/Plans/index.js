import React from 'react';
import Action from '~/components/Actions';
import Button from '~/components/Button';
import List from '~/components/List';

import { Container } from './styles';

export default function PlansList() {
  return (
    <Container>
      <Action title="Gerenciando planos">
        <Button action={() => {}}>Cadastrar</Button>
      </Action>
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
          <tr>
            <td>Start</td>
            <td className="center">1 mês</td>
            <td className="center">R$129,00</td>
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
        </tbody>
      </List>
    </Container>
  );
}
