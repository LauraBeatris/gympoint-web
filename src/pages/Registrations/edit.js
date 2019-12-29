import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { format, addMonths, parseISO } from 'date-fns';

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

import schema from '~/validators/student';

export default function StudentsEdit({ match }) {
  const { params } = match;
  const { registration_id } = params;
  const [registration, setRegistration] = useState({
    plan: { id: '', name: '', duration: 1, price: '' },
    student: { id: '', name: '' },
    start_date: '',
    end_date: '',
    price: 0,
  });

  const formattedEndDate = useMemo(() => {
    console.tron.log(registration.start_date);

    if (registration.start_date && registration.plan.duration) {
      return format(
        addMonths(
          parseISO(registration.start_date),
          registration.plan.duration
        ),
        "dd'/'MM'/'yyyy"
      );
    }
    return null;
  }, [registration.plan.duration, registration.start_date]);

  // Loading student data
  useEffect(() => {
    async function getRegistration() {
      try {
        const response = await api
          .get(`registrations/${registration_id}`)
          .then(res => setRegistration(res.data));
        return response;
      } catch (err) {
        return toast(
          'Falha ao procurar os dados da matrícula. Verifique os dados novamente',
          'error'
        );
      }
    }

    getRegistration();
  }, [registration_id]);

  async function handleSubmit(data) {
    try {
      await api
        .put(`registrations/${registration_id}`, data)
        .then(res => setRegistration(res.data));

      toast('Matrícula atualizada com sucesso', 'success');

      return history.push('/students');
    } catch (err) {
      if (err.response.data) {
        return toast(err.response.data.messageContent, 'error');
      }
      return toast(
        'Erro na atualização da matrícula. Verifique os dados',
        'error'
      );
    }
  }

  return (
    <Container>
      <StyledForm schema={schema.register} onSubmit={handleSubmit}>
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
          <AsyncSelect
            name="student_id"
            id="student_id"
            placeholder="Buscar aluno"
            loadOptionsEndpoint="/students"
            loadOptionsError="Erro no carregamento dos estudantes"
            value={registration.student_id}
          />

          <div className="grid">
            <div>
              <Label htmlFor="plan_id">PLANO</Label>
              <StyledSelect
                name="plan_id"
                id="plan_id"
                placeholder="Selecione um plano"
                options={[]}
                value={registration.plan_id}
                // onChange={e => setPlan(JSON.parse(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="start_date">DATA DE INÍCIO</Label>
              <DatePicker
                name="start_date"
                id="start_date"
                placeholder="Selecione uma data de início"
                // minDate={startDate}
                // onChange={date => setStartDate(date)}
                value={registration.start_date}
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
                value={registration.final_price}
              />
            </div>
          </div>
        </FormContainer>
      </StyledForm>
    </Container>
  );
}

StudentsEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape(),
  }).isRequired,
};
