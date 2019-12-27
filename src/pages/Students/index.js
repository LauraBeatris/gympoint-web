import React from 'react';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import List from '~/components/List';

import { Container } from './styles';

export default function StudentsList() {
  return (
    <Container>
      <Action title="Gerenciando alunos">
        <Button action={() => {}}>Cadastrar</Button>
        <Input type="text" name="q" placeholder="Buscar aluno" />
      </Action>
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
          <tr>
            <td>Cha Ji-Hun</td>
            <td>example@rocketseat.com.br</td>
            <td className="center">20</td>
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
          <tr>
            <td>Cha Ji-Hun</td>
            <td>example@rocketseat.com.br</td>
            <td className="center">20</td>
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
          <tr>
            <td>Cha Ji-Hun</td>
            <td>example@rocketseat.com.br</td>
            <td className="center">20</td>
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
