import React, { useEffect, useState, useMemo } from 'react';
import Helmet from 'react-helmet';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { format, addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';
import SelectAsync from 'react-select/async';
import Select from 'react-select';
import { registerLocale } from 'react-datepicker';

import Action from '~/components/Actions';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Label from '~/components/Label';
import DatePicker from '~/components/DatePicker';

import api from '~/services/api';
import history from '~/services/history';
import toast from '~/services/toast';

import { FormContainer, StyledForm, Container, Currency } from './styles';

import schema from '~/validators/registration';

export default function RegistrationsRegister() {
  const [plans, setPlans] = useState([]);
  const [student, setStudent] = useState({});

  /* To calculate the final price */
  const [plan, setPlan] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  registerLocale('pt', pt);

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
  const total =
    useMemo(() => {
      if (plan) return plan.duration * plan.price;
      return null;
    }, [plan]) || 0;

  const formattedEndDate = useMemo(() => {
    if (plan) {
      return format(addMonths(startDate, plan.duration), "dd'/'MM'/'yyyy");
    }
    return 'DD/MM/YYYY';
  }, [plan, startDate]);

  async function loadStudents(query) {
    // Receiving the query value from the input element
    const response = await api.get(`students?q=${query}`);
    const filteredStudents = response.data.map(s => {
      return {
        ...s,
        value: s.id,
        label: s.name,
      };
    });

    // One of the ways to return data to the AsyncSelect component -> Returning a promise
    return new Promise(resolve => {
      resolve(filteredStudents);
    });
  }

  async function handleSubmit({ start_date }) {
    start_date = new Date(start_date).toISOString();
    const plan_id = plan.id;
    const student_id = student.id;

    if (!plan_id)
      return toast(
        'Por favor, selecione um plano para efetuar a matrícula',
        'error'
      );
    if (!student_id)
      return toast(
        'Por favor, selecione um aluno para efetuar a matrícula',
        'error'
      );

    try {
      await api.post('registrations', { plan_id, start_date, student_id });

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

  const customStyles = {
    control: provided => ({
      ...provided,
      minHeight: '38px',
    }),
    indicatorsContainer: provided => ({
      ...provided,
      height: '38px',
    }),
  };

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
          <Label htmlFor="student">ALUNO</Label>
          <SelectAsync
            className="select"
            cacheOptions
            isClearable
            defaultOptions
            loadOptions={e => loadStudents(e)}
            value={student}
            onChange={e => setStudent(e)}
            placeholder="Buscar aluno"
            styles={customStyles}
          />

          <div className="grid">
            <div>
              <Label htmlFor="plan">PLANO</Label>
              <Select
                name="plan"
                id="plan"
                placeholder="Selecione um plano"
                options={plans}
                value={plan}
                getOptionLabel={option => option.title}
                getOptionValue={option => option.id}
                onChange={e => setPlan(e)}
                styles={customStyles}
              />
            </div>

            <div>
              <Label htmlFor="start_date">DATA DE INÍCIO</Label>
              <DatePicker
                name="start_date"
                id="start_date"
                locale="pt"
                dateFormat="dd/MM/yyyy"
                placeholder="Selecione uma data de início"
                minDate={startDate}
                value={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>

            <div>
              <Label htmlFor="end_date">DATA DE TÉRMINO</Label>
              <Input
                id="end_date"
                name="end_date"
                value={formattedEndDate}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="price">VALOR FINAL</Label>
              <Currency
                background="#e0e0e0"
                prefix="R$"
                fixedDecimalScale
                decimalSeparator=","
                decimalScale={2}
                thousandSeparator="."
                name="total"
                id="total"
                value={total}
                disabled
              />
            </div>
          </div>
        </FormContainer>
      </StyledForm>
    </Container>
  );
}
