import Button from './Button';
import styled from '@emotion/styled';

const FilterButton = styled.span`
    background: transparent;
    color: #949494;
    padding: 0.5rem 1rem;
    border-radius: 19px;
    cursor: pointer;
    transition: all 0.25s ease-in-out;

    &:hover{
        border: 1px solid #0F7669;
        background: #0F76691A;
        color: #0F7669;
    }
`
function Filter() {
  return (
    <FilterButton>Filters</FilterButton>
  )
}

export default Filter