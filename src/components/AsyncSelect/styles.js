import styled from 'styled-components';
import Select from 'react-select';

const StyledSelect = styled(Select)`
  border-radius: 0.4rem;

  color: #999;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;

  .css-1pahdxg-control:hover,
  .css-1pahdxg-control {
    border-color: #ee4d64;
    box-shadow: 0 0 0 1px #ee4d64;
  }

  &::placeholder {
    color: #999999;
  }
`;

export default StyledSelect;
