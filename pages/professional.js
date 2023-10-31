import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import Logo from '../components/shared/Logo';
import ProgressBar from '../components/shared/ProgressBar';
import { useState } from 'react';
import FirstLastName from '../components/forms/FirstLastName';
import CategorySkills from '../components/forms/CategorySkills';
import WhatYouDo from '../components/forms/WhatYouDo';
import SelectGender from '../components/forms/SelectGender';
import Location from '../components/forms/Location';
import PhoneNo from '../components/forms/PhoneNo';
import Ott from '../components/forms/Ott';
import UploadDoc from '../components/forms/UploadDoc';
import EmailVerifyForm2 from '../components/forms/EmailVerifyForm2';
import EmailVerifyForm1 from '../components/forms/EmailVerifyForm1';

import UnverifiedAccountForm from '../components/forms/UnverifiedAccountForm';

import ProfessionalFormPayment from '../components/forms/MemberShip';
import MemberShip from '../components/forms/MemberShip';
import EmailVerifyFormPopUp from '../components/forms/EmailVerifyFormPopUp';
import { updateClientData } from '../components/forms/formService';
import { async } from '../src/store';

const MainBox = styled(Box)`
  background-color: #f0f0f0;
  width: 100%;
  height: auto;
  min-height: 100vh;
  overflow: auto;
`;

function Professional() {
  const [progressPercent, setProgressPercent] = useState(10);
  const [currentActiveForm, setCurrentActiveForm] = useState(1);
  const isAccountVerified = true; //fetch from API

  const handleNextClick = (value) => {
    console.log('handleNextClick called with value:', value);
    if (value) {
      setProgressPercent(progressPercent + 9);
      setCurrentActiveForm((prev) => prev + 1);
    }
  };

  const requestUpdate = async (item) => {
    const clientId = await localStorage.getItem('hinyn-cid');
    let clientData = await getStoredClient();
    clientData = {
      ...clientData.attributes,
      id: clientData.id,
      ...item,
    };
    updateClientData(clientData, clientId)
      .then((result) => {
        if (result?.data) {
          localStorage.setItem(
            'hinyn-clientData',
            JSON.stringify(result?.data)
          );
          handleNextClick(true);
        }
      })
      .catch((e) => console.log('request update', e));
  };

  const getStoredClient = async () => {
    const req = localStorage.getItem('hinyn-clientData');
    return await JSON.parse(req);
  };

  return (
    <>
      <MainBox>
        <Container maxWidth="xl" sx={{ padding: '1rem', marginLeft: '6rem' }}>
          <Logo />
        </Container>
        <ProgressBar progress={progressPercent} />
        {currentActiveForm === 1 ? (
          <FirstLastName handleNextClick={requestUpdate} />
        ) : null}
        {currentActiveForm === 2 ? (
          <CategorySkills handleNextClick={requestUpdate} />
        ) : null}
        {currentActiveForm === 3 ? (
          <WhatYouDo handleNextClick={requestUpdate} />
        ) : null}
        {currentActiveForm === 4 ? (
          <SelectGender handleNextClick={requestUpdate} />
        ) : null}
        {currentActiveForm === 5 ? (
          <Location handleNextClick={requestUpdate} />
        ) : null}
        {currentActiveForm === 6 ? (
          <PhoneNo handleNextClick={requestUpdate} />
        ) : null}
        {currentActiveForm === 7 ? (
          <Ott handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 8 ? (
          <UploadDoc handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 9 && !isAccountVerified ? (
          <UnverifiedAccountForm />
        ) : null}
        {currentActiveForm === 9 && isAccountVerified ? (
          <EmailVerifyForm1 handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 10 && isAccountVerified ? (
          <EmailVerifyFormPopUp handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 11 && isAccountVerified ? (
          <EmailVerifyForm2 handleNextClick={handleNextClick} />
        ) : null}

        {currentActiveForm === 12 ? (
          <MemberShip handleNextClick={handleNextClick} />
        ) : null}
        {/* {currentActiveForm === 11 ? (
          <ProfessionalFormPayment handleNextClick={handleNextClick} />
        ) : null} */}

        {/* {currentActiveForm === 12 ? (
          <ProfessionalForm10 handleNextClick={handleNextClick} />
        ) : null}
        {currentActiveForm === 13 ? (
          <VerifyPaymentForm1 handleNextClick={handleNextClick} />
        ) : null} */}
      </MainBox>
      {/* <Footer/> */}
    </>
  );
}

export default Professional;
