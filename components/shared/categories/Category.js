import { GiPhotoCamera } from "react-icons/gi";
import styled from '@emotion/styled';
import { useState } from 'react';


const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 9px;
  color : ${props => props.isSelected ? '#EB4C60' : '#939393'};
  align-items: center;
  border-bottom : ${props => props.isSelected ? '1px solid #EB4C60' : ''};


  &:hover{
    color: ${props => props.isSelected ? '#EB4C60' : '#525252'};
  }
`
const Icon = styled(GiPhotoCamera)`
  font-size: 30px;
`
const Label = styled.span`
  text-align: center;
  font-size: 12px;
  margin-bottom: 4px;
`

function CategoryIcon({data, isSelected}) {
  return (
    <IconContainer isSelected={isSelected}>
      <Icon/>
      <Label>{data.title}</Label>
    </IconContainer>
  )
}

export default CategoryIcon