import React from 'react';
import Logo from '~/assets/logo.svg';

// import { Container } from './styles';

export default function SignIn() {
  return (
    <>
      <img src={Logo} alt="GymPoint" title="GymPoint" />
      <form>
        <div className="input-container">
          <label htmlFor="email">Seu e-mail</label>
          <input type="email" id="email" placeholder="exemplo@gmail.com" />
        </div>
        <div className="input-container">
          <label htmlFor="password">Sua senha</label>
          <input type="password" id="password" placeholder="*************" />
        </div>
        <button type="submit">Entrar no sistema</button>
      </form>
    </>
  );
}
