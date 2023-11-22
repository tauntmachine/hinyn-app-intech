import { useState } from 'react';
import styled from '@emotion/styled';
import { MenuItem, FormControl, Select } from '@mui/material';
import { Box } from '@mui/system';

const DropdownContainer = styled(Box)`
  display: flex;
  align-items: center;
`;
const Label = styled.span`
  padding: 0.5rem 1rem;
  color: #949494;
`;
const Option = styled(MenuItem)`
  font-family: 'DM Sans', sans-serif !important;
  color: ${(props) => (props.color === 'red' ? '#FF5A5F' : '#0F7669')};
  background: transparent;
  background: ${(props) =>
    props.bgcolor === 'transparent' ? 'transparent' : ''};
`;
const CustomSelect = styled(Select)`
  font-family: 'DM Sans', sans-serif !important;
  background: ${(props) =>
    props.type === 'standard'
      ? '#ffffff'
      : props.color === 'red'
      ? 'transparent'
      : 'transparent'};
  background: ${(props) =>
    props.bgcolor === 'transparent' ? 'transparent' : ''};
  color: ${(props) => (props.color === 'red' ? '#FF5A5F' : '#4aa398')};
  border: ${(props) =>
    props.type === 'outlined' ? '1px solid #94949470' : 'none'};
  border-bottom: ${(props) =>
    props.type === 'standard' ? 'none' : '1px solid #94949470'};
  padding: 0.5rem 1rem;
  border-radius: ${(props) =>
    props.type === 'standard' || props.type === 'outlined' ? '4px' : 'none'};

  &:before {
    border-bottom: 0;
  }

  &:hover {
    background: ${(props) =>
      props.type === 'standard' ? '#ffffff' : 'transparent'};
  }
`;

export default function DropdownO({
  hasLabel,
  label,
  items,
  width,
  type,
  setHandleOnChange,
  color,
  selected,
  bgcolor,
  defaultLabel,
}) {
  const handleChange = (event) => {
    console.log('event', event.target.value);
    if (setHandleOnChange) setHandleOnChange(event.target.value);
  };

  return (
    <DropdownContainer>
      {hasLabel && <Label>{label}</Label>}
      <FormControl variant="standard" sx={{ m: 1, minWidth: { width } }}>
        {items ? (
          <CustomSelect
            labelId="dropdown-select-label"
            id="dropdown-select"
            value={
              selected
                ? selected
                : // : items[0].key
                  // ? items[0].key
                  // : items[0].value) ?? ''
                  ''
            }
            onChange={handleChange}
            label={label ?? ''}
            type={type}
            color={color}
            bgcolor={bgcolor}
            disableUnderline={true}
            placeholder="asdjh"
            defaultLabel={defaultLabel}
          >
            {items &&
              items.map((item, idx) => (
                <Option
                  key={(item?.key ?? item?.value) + '-' + idx}
                  value={item?.key ?? item?.value}
                  color={color}
                  bgcolor={bgcolor}
                >
                  {item?.title ?? item}
                </Option>
              ))}
          </CustomSelect>
        ) : null}
      </FormControl>
    </DropdownContainer>
  );
}
