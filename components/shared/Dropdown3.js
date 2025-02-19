import { useState } from 'react';
import styled from '@emotion/styled';
import { MenuItem, FormControl, Select } from '@mui/material';
// import { Box } from '@mui/system';

const DropdownC = styled.div`
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
`;
const CustomSelect = styled(Select)`
  font-family: 'DM Sans', sans-serif !important;
  background: ${(props) =>
    props.type === 'standard'
      ? '#ffffff'
      : props.color === 'red'
      ? '#FADBD8 '
      : 'transparent'};

  color: ${(props) => (props.color === 'red' ? 'red' : '#0F7669')};

  padding: 0.5rem 1rem;
  border-radius: ${(props) =>
    props.type === 'standard' || props.type === 'outlined' ? '7px' : 'none'};

  &:before {
    border-bottom: 0;
  }

  &:hover {
    background: ${(props) => (props.hovercolor === 'pink' ? '#FADBD8' : '')};
  }
`;

export default function Dropdown3({
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
    <DropdownC>
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
    </DropdownC>
  );
}
