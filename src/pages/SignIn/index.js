import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';
import Logo from '~/assets/logo.svg';

// import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo, 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignIn() {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={Logo} alt="GymPoint" title="GymPoint" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email">Seu e-mail</label>
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="exemplo@gmail.com"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Sua senha</label>
          <Input
            name="password"
            type="password"
            id="password"
            placeholder="*************"
          />
        </div>
        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}
