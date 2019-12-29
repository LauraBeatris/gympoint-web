import * as Yup from 'yup';

export default {
  register: Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    age: Yup.string().required('A idade é obrigatória'),
    email: Yup.string()
      .email('Insira um email válido')
      .required('O email é obrigatório'),
    weight: Yup.string().required('O peso é obrigatório'),
    height: Yup.string().required('A altura é obrigatória'),
  }),
  edit: Yup.object().shape({
    name: Yup.string(),
    age: Yup.number()
      .min(12, 'No mínimo, 14 anos de idade')
      .max(90, 'Idade inválida'),
    email: Yup.string().email('Insira um email válido'),
    weight: Yup.number(),
    height: Yup.number(),
  }),
};
