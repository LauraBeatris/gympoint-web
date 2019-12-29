import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';

export const StyledDatePicker = styled(ReactDatePicker)`
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  background: ${props => props.background};
  width: 100%;

  color: #999;
  font-size: 1.4rem;

  padding: 1.1rem 1.4rem 1.1rem 1rem;

  &::placeholder {
    color: #999999;
  }
`;
