import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import Logo from '../components/shared/Logo';
import ProgressBar from '../components/shared/ProgressBar';
import { useState } from 'react';
import ProfessionalForm1 from '../components/forms/ProfessionalForm1';
import ProfessionalForm2 from '../components/forms/ProfessionalForm2';
import ProfessionalForm3 from '../components/forms/ProfessionalForm3';
import ProfessionalForm4 from '../components/forms/ProfessionalForm4';
import ProfessionalForm5 from '../components/forms/ProfessionalForm5';
import ProfessionalForm6 from '../components/forms/ProfessionalForm6';
import ProfessionalForm7 from '../components/forms/ProfessionalForm7';
import ProfessionalForm8 from '../components/forms/ProfessionalForm8';
import ProfessionalForm9 from '../components/forms/ProfessionalForm9';
import ProfessionalForm9a from '../components/forms/ProfessionalForm9a';
import ProfessionalForm10 from '../components/forms/ProfessionalForm10';
import ProfessionalForm11 from '../components/forms/ProfessionalForm11';
import UnverifiedAccountForm from '../components/forms/UnverifiedAccountForm';
import VerifyPaymentForm1 from '../components/forms/VerifyPaymentForm1';
import Footer from '../components/section/Footer';
import ProfessionalFormPayment from '../components/forms/ProfessinalFormPayment';

const MainBox = styled(Box)`
  background-color: #f0f0f0;
  width: 100%;
  height: auto;
  min-height: 100vh;
  overflow: auto;
`;

function CreateProfessionalAccount() {
  const [progressPercent, setProgressPercent] = useState(10);
  const [currentActiveForm, setCurrentActiveForm] = useState(1);
  const isAccountVerified = true; //fetch from API

  const handleNextClick = (value) => {
    if (value) {
      setProgressPercent(progressPercent + 9);
      setCurrentActiveForm((prev) => prev + 1);
    }
  };

  return (
    <>
      <MainBox>
        <Container maxWidth="xl" sx={{ padding: '1rem 0' }}>
          <Logo />
        </Container>
        <ProgressBar progress={progressPercent} />
        {currentActiveForm === 1 ? (
          <ProfessionalForm1 handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 2 ? (
          <ProfessionalForm2 handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 3 ? (
          <ProfessionalForm3 handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 4 ? (
          <ProfessionalForm4 handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 5 ? (
          <ProfessionalForm5 handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 6 ? (
          <ProfessionalForm6 handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 7 ? (
          <ProfessionalForm7 handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 8 ? (
          <ProfessionalForm8 handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 9 ? (
          <ProfessionalForm9a handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 10 && !isAccountVerified ? (
          <UnverifiedAccountForm />
        ) : null}
        {currentActiveForm === 10 && isAccountVerified ? (
          <ProfessionalForm9 handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 11 && isAccountVerified ? (
          <ProfessionalFormPayment handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 12 ? (
          <ProfessionalForm10 handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 13 ? (
          <VerifyPaymentForm1 handleNextClick={handleNextClick} />
        ) : null}
      </MainBox>
      {/* <Footer/> */}
    </>
  );
}

export default CreateProfessionalAccount;
