import React, { useRef, useEffect, useState } from 'react';
import { useField } from '@rocketseat/unform';

import api from '~/services/api';
import toast from '~/services/toast';
import Select from './styles';

export default function ReactSelect({
  name,
  multiple,
  loadOptionsEndpoint,
  loadOptionsError,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [options, setOptions] = useState([]);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName, rest.value]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;

    if (!multiple) {
      return options.find(option => option.id === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }

  useEffect(() => {
    async function loadOptions() {
      try {
        await api.get(`${loadOptionsEndpoint}`).then(res => {
          const data = res.data.map(({ name: title, id }) => ({
            id,
            title,
          }));
          setOptions(data);
        });
      } catch (err) {
        toast(loadOptionsError, 'error');
      }
    }
    loadOptions();
  }, [loadOptionsEndpoint, loadOptionsError]);

  return (
    <>
      <Select
        name={fieldName}
        aria-label={fieldName}
        options={options}
        isMulti={multiple}
        defaultValue={getDefaultValue()}
        ref={ref}
        getOptionValue={option => option.title}
        getOptionLabel={option => option.title}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}
