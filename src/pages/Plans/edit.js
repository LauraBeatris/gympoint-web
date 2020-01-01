import React, { useState, useEffect, useMemo } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
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

export default function PlansEdit({ match }) {
  const { params } = match;
  const { plan_id } = params;

  /* Initial data */
  const [plan, setPlan] = useState({});

  /* Values to calculate the total price */
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  const [loading, setLoading] = useState(false);

  /* Getting the plan initial data */
  useEffect(() => {
    async function getPlan() {
      try {
        setLoading(true);

        const response = await api.get(`plans/${plan_id}`);
        setPrice(response.data.price);
        setDuration(response.data.duration);
        return setPlan(response.data);
      } catch (err) {
        const { contentMessage } = JSON.parse(err.response.data.error.message);
        if (contentMessage) {
          return toast(contentMessage, 'error');
        }

        return toast('Erro ao carregar os dados do plano.', 'error');
      } finally {
        setLoading(false);
      }
    }

    getPlan();
  }, [plan_id]);

  /* Calculating the total price everytime that the duration and price infos change */
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

  /* Submitting the updated data */

  async function handleSubmit({ title }) {
    if (!price)
      return toast(
        'Por favor, digite o preço mensal do plano antes de cria-lo',
        'error'
      );

    let finalPrice;
    if (typeof price === 'string') {
      finalPrice = Number(removeMask(price) / 100);
    } else {
      finalPrice = price;
    }

    try {
      await api.put(`plans/${plan_id}`, {
        title,
        duration,
        price: finalPrice,
      });

      toast('Plano editado com sucesso', 'success');

      return history.push('/plans');
    } catch (err) {
      if (err.response && err.response.data.messageContent) {
        return toast(err.response.data.messageContent, 'error');
      }
      return toast('Erro na atualização do plano. Verifique os dados', 'error');
    }
  }

  return (
    <Container>
      <Helmet>
        <title> GymPoint | Edição de plano </title>
      </Helmet>
      <StyledForm
        initialData={plan}
        schema={schema.register}
        onSubmit={handleSubmit}
      >
        <Action title="Edição de plano">
          <Button to="/plans">
            <MdKeyboardArrowLeft /> Voltar
          </Button>
          <Button type="submit" background="#CCCCCC">
            <MdDone /> Salvar
          </Button>
        </Action>
        {!loading ? (
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
                  value={price}
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
        ) : (
          <p> Carregando dados do plano... </p>
        )}
      </StyledForm>
    </Container>
  );
}

PlansEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ plan_id: PropTypes.string }),
  }).isRequired,
};
