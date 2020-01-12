import React from 'react';
import { useDispatch } from 'react-redux';
import { shallow, mount } from 'enzyme';

import Signin from '~/pages/SignIn';

jest.mock('react-redux');

describe('Signin Page', () => {
  function getWrapper() {
    return shallow(<Signin />);
  }

  it('should submit successfully', () => {
    const wrapper = mount(<Signin />);
    const form = wrapper.find('Form');

    const dispatch = jest.fn();

    useDispatch.mockImplementation(dispatch);

    form.prop('onSubmit')({ email: 'admin@gympoint.com', password: '123456' });

    expect(wrapper).toMatchSnapshot();
    expect(useDispatch).toHaveBeenCalledTimes(1);
  });
});
