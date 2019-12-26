import React from 'react';
import api from '~/services/api';
// import { Container } from './styles';

export default function Students() {
  api.get('plans');
  return <h1> Students </h1>;
}
