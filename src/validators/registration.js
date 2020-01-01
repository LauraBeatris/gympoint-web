import * as Yup from 'yup';

export default {
  register: Yup.object().shape({
    start_date: Yup.string().required('A data de início é obrigatória'),
  }),
  edit: Yup.object().shape({
    name: Yup.string(),
    plan: Yup.string(),
    start_date: Yup.string(),
    end_date: Yup.string(),
  }),
};
