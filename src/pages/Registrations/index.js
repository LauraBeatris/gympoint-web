import React from 'react';
import Action from '~/components/Actions';
import Button from '~/components/Button';
import List from '~/components/List';

import { Container } from './styles';

export default function RegistrationsList() {
  return (
    <Container>
      <Action title="Gerenciando matrículas">
        <Button action={() => {}}>Cadastrar</Button>
      </Action>
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
          <tr>
            <td>Hashim Briscam</td>
            <td className="center">Start</td>
            <td className="center">30 de abril de 1998</td>
            <td className="center">30 de maio de 1999</td>
            <td className="center">Sim</td>

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
