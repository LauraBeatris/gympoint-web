import React, { useState, useMemo } from 'react';
import Helmet from 'react-helmet';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Label from '~/components/Label';

import api from '~/services/api';
import history from '~/services/history';
import toast from '~/services/toast';

import { formatMoney } from '~/util/format';
import removeMask from '~/helpers/removeMask';

import { FormContainer, StyledForm, Container, Currency } from './styles';

import schema from '~/validators/plans';

export default function PlansRegister() {
  /* Values to calculate the total price */
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  const totalPrice =
    useMemo(() => {
      let finalPrice;
      if (typeof price === 'string') {
        finalPrice = Number(removeMask(price) / 100);
      } else {
        finalPrice = price;
      }

      return formatMoney(Number(duration) * Number(finalPrice));
    }, [duration, price]) || formatMoney(0);

  async function handleSubmit({ title }) {
    if (!price)
      return toast(
        'Por favor, digite o preço mensal do plano antes de cria-lo',
        'error'
      );

    try {
      await api.post('plans', {
        title,
        duration,
        price: removeMask(price) / 100,
      });

      toast('Plano cadastrado com sucesso', 'success');

      return history.push('/plans');
    } catch (err) {
      if (err.response && err.response.data.messageContent) {
        return toast(err.response.data.messageContent, 'error');
      }
      return toast('Erro no cadastro do plano. Verifique os dados', 'error');
    }
  }

  return (
    <Container>
      <Helmet>
        <title> GymPoint | Cadastro de plano </title>
      </Helmet>
      <StyledForm schema={schema.register} onSubmit={handleSubmit}>
        <Action title="Cadastro de plano">
          <Button to="/plans">
            <MdKeyboardArrowLeft /> Voltar
          </Button>
          <Button type="submit" background="#CCCCCC">
            <MdDone /> Salvar
          </Button>
        </Action>
        <FormContainer>
          <Label htmlFor="title">TÍTULO DO PLANO</Label>
          <Input type="text" name="title" id="title" />

          <div>
            <div>
              <Label htmlFor="duration">DURAÇÃO (em meses)</Label>
              <Input
                type="text"
                name="duration"
                id="duration"
                onChange={ev => setDuration(ev.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="price">PREÇO MENSAL</Label>
              <Currency
                name="price"
                id="price"
                prefix="R$"
                fixedDecimalScale
                decimalSeparator=","
                decimalScale={2}
                thousandSeparator="."
                onChange={ev => setPrice(ev.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="total_price">PREÇO TOTAL</Label>
              <Currency
                name="total_price"
                id="total_price"
                prefix="R$"
                fixedDecimalScale
                decimalSeparator=","
                decimalScale={2}
                thousandSeparator="."
                value={totalPrice}
                disabled
              />
            </div>
          </div>
        </FormContainer>
      </StyledForm>
    </Container>
  );
}
