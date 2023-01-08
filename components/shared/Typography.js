import styled from "@emotion/styled";

const Text = styled.div`
  color: ${props => props.color === 'red' ? '#EB4C60' : props.color === 'green' ? '#4AA398' : '#525252' };
  font-size: 14px;
  text-align: ${props => props.align === 'center' ? 'center' : 'left'};
`;

export const SmallText = styled(Text)`
    font-size: 10px;
`

export default Text;