import React from "react"

import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from "@mui/material"

export const Select = ({ label, value, onChange, datasource = [] }) => {
  const handleChange = event => onChange && onChange(event.target.value)

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect value={value} label={label} onChange={handleChange}>
        {datasource.map(x => (
          <MenuItem key={x.value} value={x.value}>
            {x.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
