import React, { useState, useEffect, useMemo } from 'react';
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

import { FormContainer, StyledForm, Container } from './styles';

import schema from '~/validators/plans';

export default function PlansEdit({ match }) {
  const { params } = match;
  const { plan_id } = params;

  /* Initial data */
  const [plan, setPlan] = useState({});

  /* Values to calculate the total price */
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  /* Getting the plan initial data */
  useEffect(() => {
    async function getPlan() {
      try {
        const response = await api.get(`plans/${plan_id}`);
        return setPlan(response.data);
      } catch (err) {
        const { contentMessage } = JSON.parse(err.response.data.error.message);
        if (contentMessage) {
          return toast(contentMessage, 'error');
        }

        return toast('Erro ao carregar os dados do plano.', 'error');
      }
    }

    getPlan();
  }, [plan_id]);

  /* Calculating the total price everytime that the duration and price infos change */
  const totalPrice =
    useMemo(
      () =>
        formatMoney(
          Number(duration || plan.duration) * Number(price || plan.price)
        ),
      [duration, plan.duration, plan.price, price]
    ) || formatMoney(0);

  /* Submitting the updated data */

  async function handleSubmit(data) {
    try {
      await api.put(`plans/${plan_id}`, data);

      toast('Plano editado com sucesso', 'success');

      return history.push('/plans');
    } catch (err) {
      if (err.response.data.messageContent) {
        return toast(err.response.data.messageContent, 'error');
      }
      return toast('Erro na edição do plano. Verifique os dados', 'error');
    }
  }

  return (
    <Container>
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
              <Input
                type="text"
                name="price"
                id="price"
                onChange={ev => setPrice(ev.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="total_price">PREÇO TOTAL</Label>
              <Input
                background="#e0e0e0"
                readOnly
                type="text"
                name="total_price"
                id="total_price"
                value={totalPrice}
              />
            </div>
          </div>
        </FormContainer>
      </StyledForm>
    </Container>
  );
}

PlansEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ plan_id: PropTypes.string }),
  }).isRequired,
};
