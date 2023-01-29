import { Container, Typography, CssBaseline, Stack, Box } from '@mui/material';
import Text from '../shared/Typography';
import styled from '@emotion/styled';
import { CheckIcon } from '../shared/Icon';
import { useFreelancer } from '../../src/store';
import CardsSection from '../section/CardsSection';
import Modal from '../shared/Modal';
import { useState } from 'react';
import BidFreelancerForm from '../forms/BidFreelancerForm';

const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: #c16f7a;
  width: 6rem;
  height: 6rem;
`;

const StyledCheckIcon = styled(CheckIcon)`
  font-size: 4rem;
  color: #ffffff;
`;

const ProjectSuccessPost = () => {
  const { freelancer, filter, setFilter } = useFreelancer();
  const [open, setOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = (data) => {
    console.log('this is clicked outside', data)
    setSelectedFreelancer(()=> data);
    setOpen(()=> true )
  }

  const handleBidSubmit = () => {
    console.log('bid submitted')
  }

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          marginBottom: '2rem',
          marginTop: '5rem',
          background: 'transparent',
        }}
      >
        <CssBaseline />
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <IconContainer>
            <StyledCheckIcon />
          </IconContainer>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{ color: '#ffffff' }}
          >
            <b>Project Successfully Posted!</b>
          </Typography>
          <Container maxWidth="sm">
            <Typography component="p" align="center" sx={{ color: '#ffffff' }}>
              Your project is posted on our platform and we have a sent a
              notification to the professionals who have the necessary skills.
              If you have a specific professional that you would like to work
              with, notify them about your project and send them a bid below:
            </Typography>
          </Container>
        </Stack>
      </Container>
      <Container
        maxWidth="xl"
        sx={{marginBottom: '50px' }}
      >
        <CardsSection cards={freelancer[0]} hasTools={false} cardText="Send a bid" handleButtonClick={handleButtonClick} />
      </Container>
      <Modal handleClose={handleClose} isOpen={open} maxWidth="md">
        <BidFreelancerForm handleBidSubmit={handleBidSubmit} data={selectedFreelancer}/>
     </Modal>
    </>
  );
};

export default ProjectSuccessPost;
