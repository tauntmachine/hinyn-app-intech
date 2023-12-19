import { Container, Box, Pagination } from '@mui/material';

import styled from '@emotion/styled';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { useFreelancer } from '../../src/store';
import Dropdown2 from '../shared/Dropdown2';
import CardsSection from './CardsSection';

const ContainerCustom = styled.div``;
const ContainerCustom2 = styled.div``;
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
      <Container
        sx={{
          display: 'flex',
          gap: '2rem',
          marginTop: '1rem',
        }}
        maxWidth="xl"
      >
        <Dropdown2 hasLabel={true} label="Show" items={showOptions} />
        <Dropdown2 hasLabel={true} label="Sort" items={sortOptions} />
      </Container>
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
