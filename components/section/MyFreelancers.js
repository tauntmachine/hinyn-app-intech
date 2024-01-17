import { Container, Box } from '@mui/material';

import styled from '@emotion/styled';

import { useFreelancer } from '../../src/store';
import Dropdown2 from '../shared/Dropdown2';
import CardsSection from './CardsSection';

const ContainerCustom2 = styled.div``;
const ContainerStyle = styled(Container)`
  @media (max-width: 769px) {
    flex-direction: column;
    gap: 0px;
    margin-top: 10px;
  }

  gap: 40px;
  margin-top: 30px;
`;
const MyFreelancers = () => {
  const { freelancer } = useFreelancer();

  const sortOptions = [
    {
      title: 'Newest to Oldest',
      value: 'new-to-old',
    },
    {
      title: 'Oldest to Newest',
      value: 'old-to-new',
    },
    {
      title: 'Expired',
      value: 'expired',
    },
  ];

  const showOptions = [
    {
      title: 'All',
      value: 'all',
    },
    {
      title: 'Upcoming',
      value: 'upcoming',
    },
    {
      title: 'Active',
      value: 'active',
    },
    {
      title: 'Completed',
      value: 'completed',
    },
    {
      title: 'Cancelled',
      value: 'cancelled',
    },
  ];

  const handleButtonClick = () => {};
  return (
    <Box sx={{ height: 'auto', width: '80%', margin: 'auto' }}>
      <ContainerStyle
        sx={{
          display: 'flex',
          gap: '2rem',
          marginTop: '1rem',
        }}
        maxWidth="xl"
      >
        <Dropdown2 hasLabel={true} label="Show" items={showOptions} />
        <Dropdown2 hasLabel={true} label="Sort" items={sortOptions} />
      </ContainerStyle>
      <ContainerCustom2>
        <CardsSection
          cards={freelancer}
          hasTools={false}
          cardText="Hire me"
          handleButtonClick={handleButtonClick}
        />
      </ContainerCustom2>
    </Box>
  );
};

export default MyFreelancers;
