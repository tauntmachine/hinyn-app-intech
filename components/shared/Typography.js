import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Text = styled(Typography)`
  font-family: 'DM Sans', sans-serif !important;
  color: ${(props) =>
    props.color === 'red'
      ? '#EB4C60'
      : props.color === 'green'
      ? '#4AA398'
      : props.color === 'gray' // New condition for gray color
      ? '#a6a6a6'
      : '#525252'};
  // font-size: ${(props) =>
    props.size === 'large' ? '20px' : props.size === 'small' ? '10px' : '14px'};
  text-align: ${(props) => (props.align === 'center' ? 'center' : 'left')};
`;

export const SmallText = styled(Text)`
  font-size: 10px;
`;

export const GrayText = styled(Text)`
  color: #a6a6a6;
  padding-horizontal: 10px;
`;

export default Text;
