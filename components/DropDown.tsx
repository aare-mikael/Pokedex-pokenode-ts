import React from 'react';
import Select from 'react-select';

interface DropDownProps {
  options: { value: string; label: string }[];
  onChange: (selectedOption: any) => void;
}

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#333',
    borderColor: '#444',
    color: '#fff',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#555',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  input: (provided) => ({
    ...provided,
    color: 'white !important',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#333',
    zIndex: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#555' : '#333',
    color: '#fff',
  }),
  container: (provided) => ({
    ...provided,
    flex: 1,
  }),
};

const DropDown: React.FC<DropDownProps> = ({ options, onChange }) => {
  return <Select options={options} onChange={onChange} styles={customStyles} />;
};

export default DropDown;
