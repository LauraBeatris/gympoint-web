import React, { useEffect, useState, useMemo } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { format, addMonths, parseISO } from 'date-fns';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import AsyncSelect from '~/components/AsyncSelect';
import Label from '~/components/Label';
import DatePicker from '~/components/DatePicker';

import api from '~/services/api';
import history from '~/services/history';
import toast from '~/services/toast';

import { formatMoney } from '~/util/format';

import { FormContainer, StyledForm, Container, StyledSelect } from './styles';

import schema from '~/validators/registration';

export default function RegistrationsEdit({ match }) {
  const { params } = match;
  const { registration_id } = params;

  /* Initial data */
  const [registration, setRegistration] = useState({});

  /* To calculate the final price */
  const [plan, setPlan] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  /* Plans options for the select component */
  const [plans, setPlans] = useState([]);

  /* Changing student */
  const [student, setStudent] = useState({ id: '', title: '' });

  /* Getting the plan initial data */
  useEffect(() => {
    async function getRegistration() {
      try {
        const response = await api.get(`registrations/${registration_id}`);

        setPlan({
          duration: response.data.plan.duration,
          price: response.data.plan.price,
          id: response.data.plan.id,
          title: response.data.plan.title,
        });

        setStartDate(new Date(response.data.start_date));

        setStudent({
          id: response.data.student.id,
          title: response.data.student.name,
        });

        return setRegistration({
          ...response.data,
          student_id: response.data.student.id,
        });
      } catch (err) {
        const { contentMessage } = JSON.parse(err.response.data.error.message);
        if (contentMessage) {
          return toast(contentMessage, 'error');
        }

        return toast('Erro ao carregar os dados da matrícula.', 'error');
      }
    }

    getRegistration();
  }, [registration_id]);

  // Getting the plans data for the select component
  useEffect(() => {
    async function getPlans() {
      try {
        const response = await api.get('plans');
        setPlans(response.data);
      } catch (err) {
        toast('Erro no carregamento dos planos.', 'error');
      }
    }

    getPlans();
  }, []);

  // Calculating the final price
  const finalPrice =
    useMemo(() => {
      if (plan) return formatMoney(plan.duration * plan.price || 0);
      return null;
    }, [plan]) || formatMoney(0);

  const formattedEndDate = useMemo(() => {
    if (plan && plan.duration) {
      return format(addMonths(startDate, plan.duration), "dd'/'MM'/'yyyy");
    }
    if (registration.end_date) {
      return format(parseISO(registration.end_date), "dd'/'MM'/'yyyy");
    }
    return null;
  }, [plan, registration.end_date, startDate]);

  async function handleSubmit(data) {
    const start_date = new Date(data.start_date).toISOString();
    const plan_id = plan.id;
    const { id: student_id } = student;

    try {
      await api.put(`registrations/${registration_id}`, {
        start_date,
        plan_id,
        student_id,
      });

      toast('Matrícula atualizado com sucesso', 'success');

      return history.push('/registrations');
    } catch (err) {
      const { contentMessage } = JSON.parse(err.response.data.error.message);
      if (contentMessage) {
        return toast(contentMessage, 'error');
      }

      return toast('Erro na edição da matrícula. Verifique os dados', 'error');
    }
  }

  const todayDate = useMemo(() => new Date(), []);

  return (
    <Container>
      <Helmet>
        <title> GymPoint | Edição de matrícula </title>
      </Helmet>
      <StyledForm
        initialData={registration}
        schema={schema.edit}
        onSubmit={handleSubmit}
      >
        <Action title="Edição de matrícula">
          <Button to="/registrations">
            <MdKeyboardArrowLeft /> Voltar
          </Button>
          <Button type="submit" background="#CCCCCC">
            <MdDone /> Salvar
          </Button>
        </Action>
        <FormContainer>
          <Label htmlFor="student_id">ALUNO</Label>
          {/* <Input type="text" name="student" id="student" readOnly /> */}
          <AsyncSelect
            name="student"
            id="student"
            value={student}
            placeholder="Buscar aluno"
            loadOptionsEndpoint="/students"
            loadOptionsError="Erro no carregamento dos estudantes"
            onChange={data => setStudent(data)}
          />

          <div className="grid">
            <div>
              <Label htmlFor="plan_id">PLANO</Label>
              <StyledSelect
                name="plan_id"
                id="plan_id"
                placeholder="Selecione um plano"
                options={plans}
                value={plan}
                onChange={e => setPlan(e)}
                getOptionLabel={option => option.title}
                getOptionValue={option => option.id}
              />
            </div>

            <div>
              <Label htmlFor="start_date">DATA DE INÍCIO</Label>
              <DatePicker
                name="start_date"
                id="start_date"
                placeholder="Selecione uma data de início"
                minDate={todayDate}
                value={startDate}
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

RegistrationsEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ registration_id: PropTypes.string }),
  }).isRequired,
};
