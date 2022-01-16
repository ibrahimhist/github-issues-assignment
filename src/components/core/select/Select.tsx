import React from 'react';

import { FormControl, InputLabel, Select as MuiSelect, MenuItem, SelectProps as MuiSelectProps } from '@mui/material';

export type SelectProps = MuiSelectProps & {
  label: string;
  value: string;
  onChange: (val: string) => void;
  datasource: any[];
};

export const Select: React.FC<SelectProps> = ({ label, value, onChange, datasource = [], ...rest }) => {
  const handleChange = (event) => onChange && onChange(event.target.value);

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect value={value} label={label} onChange={handleChange} {...rest}>
        {datasource.map((x) => (
          <MenuItem key={x.value} value={x.value}>
            {x.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
