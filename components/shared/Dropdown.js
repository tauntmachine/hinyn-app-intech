import { useState } from 'react';
import styled from '@emotion/styled';
import { MenuItem, FormControl, Select} from '@mui/material';
import { Box } from '@mui/system';

const DropdownContainer = styled(Box)`
  display: flex;
  align-items: center;
`
const Label = styled.span`
    padding: 0.5rem 1rem;
    color: #949494;
`
const Option = styled(MenuItem)`
  color: #0F7669;
`
const CustomSelect = styled(Select)`
  background: ${props => props.type === 'standard' ? "#ffffff" : 'transparent'};
  color: #0F7669;
  border-bottom: ${props => props.type === 'standard' ? 'none' : '1px solid #94949470'};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.type === 'standard' ? '4px' : 'none'};

  &:before{
    border-bottom: 0;
  }

  &:hover{
    background: ${props => props.type === 'standard' ? "#ffffff" : 'transparent'};
  }
`

export default function Dropdown({hasLabel,label,items, width,type}) {
  const [selected, setSelected] = useState(null);

  const handleChange = (event) => {
    setSelected(event.target.value);
    console.log(event.target.value);
  };

  return (
    <DropdownContainer>
      {hasLabel && <Label>{label}</Label>}
      <FormControl variant="standard" sx={{ m: 1, minWidth:{width} }}>
        <CustomSelect
          labelId="dropdown-select-label"
          id="dropdown-select"
          value={selected ?? items[0].value}
          onChange={handleChange}
          label={label ?? ''}
          type={type}
          disableUnderline={true}
        >
        {items && items.map((item,idx) => (
            <Option key={item.value+"-"+idx} value={item.value}>
              {item.title}
            </Option>
        )
          )}
        </CustomSelect>
      </FormControl>
    </DropdownContainer>
  );
}
