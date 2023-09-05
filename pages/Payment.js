import styled from 'styled-components';
import Text from '../components/shared/Typography';
const CenterDiv = styled.div`
  margin: 25rem 35rem;
`;
function Payment() {
  return (
    <CenterDiv>
      <Text fontSize="5rem">Payment Gateway</Text>
    </CenterDiv>
  );
}

export default Payment;
