import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/logo-header.svg';
import {
  Container,
  Content,
  Navigation,
  Profile,
  StyledLink,
  Menu,
} from './styles';

export default function Header() {
  const { profile } = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleSignOut() {
    return dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <Navigation>
          <img src={logo} alt="Gympoint" title="Gympoint" />
          <ul>
            <li>
              <StyledLink to="/students">Alunos</StyledLink>
            </li>
            <li>
              <StyledLink to="/plans">Planos</StyledLink>
            </li>
            <li>
              <StyledLink to="/registrations">Matrículas</StyledLink>
            </li>
            <li>
              <StyledLink to="/help-orders">Pedidos de auxílio</StyledLink>
            </li>
          </ul>
        </Navigation>

        <Profile>
          <strong>{profile ? profile.name : 'Carregando...'}</strong>
          <button type="button" onClick={handleSignOut}>
            Sair do sistema
          </button>
        </Profile>
      </Content>

      {/* Burguer Menu for Mobile */}
      <Menu>
        <ul>
          <li>
            <StyledLink to="/students">Alunos</StyledLink>
          </li>
          <li>
            <StyledLink to="/plans">Planos</StyledLink>
          </li>
          <li>
            <StyledLink to="/registrations">Matrículas</StyledLink>
          </li>
          <li>
            <StyledLink to="/help-orders">Pedidos de auxílio</StyledLink>
          </li>
        </ul>
      </Menu>
    </Container>
  );
}
