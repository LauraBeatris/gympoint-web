import * as Yup from 'yup';

export default {
  register: Yup.object().shape({
    title: Yup.string().required('O nome do plano é obrigatório'),
    duration: Yup.string().required('A data de início é obrigatória'),
  }),
  edit: Yup.object().shape({
    title: Yup.string(),
    duration: Yup.number().min(1, 'A duração precisa ser de no mínimo um mes'),
  }),
};
