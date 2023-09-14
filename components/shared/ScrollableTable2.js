import { Box } from '@mui/material';
import styled from '@emotion/styled';
import CategoryIcon from '../shared/categories/Category';
import { RightChevronIcon, AddIcon, Cross } from './Icon';
import Category3 from './categories/Category3';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row;
  overflow: auto;
  padding: 20px 30px;
  height: 360px;

  background: #ffffff;
  border-radius: 0 0 20px 20px;
  //   border: 1px solid #dbdbdb;
`;

const Row = styled.div`
  color: #939393;
  font-size: 16px;
  background: white;
  padding: 30px 0 0 50px;
  display: flex;
  border-radius: 20px 20px 0 0;
  //   border: 1px solid #dbdbdb;

  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd30;
`;
const Row2 = styled.div`
  padding: 10px 18px;
  border: 1px solid #dbdbdb;
  color: gray;
  border-radius: 40px;
  height: 40px;
  margin: 10px 0;
  display: flex;

  flex-direction: row;
`;
const TextWithIcon = styled.div`
  display: flex;
  column-gap: 16px;
  align-items: center;
`;
const BoxDiv = styled.div`
  width: 10rem;
`;
const IconDiv = styled.div`
  margin: 1px 0 0 35px;
`;
const TextDiv = styled.div``;
const iconMap = {
  'right-arrow': <RightChevronIcon variant="green" />,
  'cross-icon': <Cross />,
  'add-icon': <AddIcon variant="red" />,
};

const ScrollableTable2 = ({
  data,
  title,
  startAdornment,
  endAdornment,
  type,
  onCategoryClick,
  onSkillClick,
}) => {
  return (
    <>
      <Row className="header">{title} Skills selected</Row>

      <StyledBox>
        <BoxDiv>
          {data &&
            data.map((skill, idx) => (
              <Row2 key={'skill-' + idx}>
                <TextDiv> {skill?.title} </TextDiv>
                <IconDiv>
                  <Cross />
                </IconDiv>
              </Row2>
            ))}
        </BoxDiv>
      </StyledBox>
    </>
  );
};

export default ScrollableTable2;
