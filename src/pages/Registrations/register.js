import React, { useEffect, useState, useMemo } from 'react';
import Helmet from 'react-helmet';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { format, addMonths } from 'date-fns';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Label from '~/components/Label';
import AsyncSelect from '~/components/AsyncSelect';
import DatePicker from '~/components/DatePicker';

import api from '~/services/api';
import history from '~/services/history';
import toast from '~/services/toast';

import { formatMoney } from '~/util/format';

import { FormContainer, StyledForm, Container, StyledSelect } from './styles';

import schema from '~/validators/registration';

export default function RegistrationsRegister() {
  const [plans, setPlans] = useState([]);

  /* To calculate the final price */
  const [plan, setPlan] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  // Getting the plans data for the select component
  useEffect(() => {
    async function getPlans() {
      try {
        const response = await api.get('plans');
        const data = response.data.map(({ id, title, duration, price }) => ({
          id: JSON.stringify({ duration, price, id }),
          title,
        }));
        setPlans(data);
      } catch (err) {
        toast('Erro no carregamento dos planos.', 'error');
      }
    }

    getPlans();
  }, []);

  // Calculating the final price
  const finalPrice =
    useMemo(() => {
      if (plan) return formatMoney(plan.duration * plan.price);
      return null;
    }, [plan]) || formatMoney(0);

  const formattedEndDate = useMemo(() => {
    if (plan) {
      return format(addMonths(startDate, plan.duration), "dd'/'MM'/'yyyy");
    }
    return null;
  }, [plan, startDate]);

  async function handleSubmit(data) {
    data.start_date = new Date(data.start_date).toISOString();
    data.plan_id = JSON.parse(data.plan_id).id;

    try {
      await api.post('registrations', data);

      toast('Aluno matrículado com sucesso', 'success');

      return history.push('/registrations');
    } catch (err) {
      const { contentMessage } = JSON.parse(err.response.data.error.message);
      if (contentMessage) {
        return toast(contentMessage, 'error');
      }

      return toast(
        'Erro no cadastro da matrícula. Verifique os dados',
        'error'
      );
    }
  }

  return (
    <Container>
      <Helmet>
        <title>GymPoint | Cadastro de matrícula</title>
      </Helmet>
      <StyledForm schema={schema.register} onSubmit={handleSubmit}>
        <Action title="Cadastro de matrícula">
          <Button to="/registrations">
            <MdKeyboardArrowLeft /> Voltar
          </Button>
          <Button type="submit" background="#CCCCCC">
            <MdDone /> Salvar
          </Button>
        </Action>
        <FormContainer>
          <Label htmlFor="student_id">ALUNO</Label>
          <AsyncSelect
            name="student_id"
            id="student_id"
            placeholder="Buscar aluno"
            loadOptionsEndpoint="/students"
            loadOptionsError="Erro no carregamento dos estudantes"
          />

          <div className="grid">
            <div>
              <Label htmlFor="plan_id">PLANO</Label>
              <StyledSelect
                name="plan_id"
                id="plan_id"
                placeholder="Selecione um plano"
                options={plans}
                onChange={e => setPlan(JSON.parse(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="start_date">DATA DE INÍCIO</Label>
              <DatePicker
                name="start_date"
                id="start_date"
                placeholder="Selecione uma data de início"
                minDate={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>

            <div>
              <Label htmlFor="end_date">DATA DE TÉRMINO</Label>
              <Input
                readOnly
                background="#e0e0e0"
                type="text"
                name="end_date"
                id="end_date"
                placeholder="DD/MM/AAAA"
                value={formattedEndDate}
              />
            </div>
            <div>
              <Label htmlFor="price">VALOR FINAL</Label>
              <Input
                readOnly
                background="#e0e0e0"
                type="text"
                name="price"
                id="price"
                value={finalPrice}
              />
            </div>
          </div>
        </FormContainer>
      </StyledForm>
    </Container>
  );
}
