import { Select } from '@mui/material';
import { useState } from 'react';
import styled from '@emotion/styled';

const SortText = styled.span`
    padding: 0.5rem 1rem;
    color: #949494;
`
export default function Dropdown() {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
       <SortText>Sort By</SortText>
    </div>
  );
}
