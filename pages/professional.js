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
  const progressRate = 11;
  const [currentActiveForm, setCurrentActiveForm] = useState(1);
  const [progressPercent, setProgressPercent] = useState(
    progressRate * currentActiveForm
  );
  const [isAccountVerified, setIsAccountVerified] = useState('');
  const [currClientData, setCurrClientData] = useState(null);
  // const isAccountVerified = true; //fetch from API

  const handleNextClick = (value) => {
    console.log('is verified', isAccountVerified);
    if (value) {
      setProgressPercent(progressPercent + progressRate);
      setCurrentActiveForm((prev) => prev + 1);
    }
  };
  const goBack = () => {
    setProgressPercent(progressPercent - 9);
    setCurrentActiveForm((prev) => prev - 1);
  };
  const requestUpdate = async (item) => {
    const clientId = await localStorage.getItem('hinyn-cid');
    let clientData = await getStoredClient();
    const newData = {
      ...item,
      id: clientData.id,
    };
    clientData = {
      ...clientData.attributes,
      ...newData,
    };
    updateClientData(clientData, clientId)
      .then(async (result) => {
        if (result?.data) {
          console.log('stringify client -', JSON.stringify(result?.data));
          // console.log('is verified - ', result?.data?.attributes?.isEmailVerified);
          const res = result?.data?.attributes;
          // const res = await JSON.parse(result?.data?.attributes);
          setIsAccountVerified(
            res?.data?.isEmailVerified == null
              ? false
              : res?.data?.isEmailVerified
          );
          setCurrClientData(res);
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
          <WhatYouDo handleNextClick={requestUpdate} handleBack={goBack} />
        ) : null}
        {currentActiveForm === 4 ? (
          <SelectGender handleNextClick={requestUpdate} handleBack={goBack} />
        ) : null}
        {currentActiveForm === 5 ? (
          <Location handleNextClick={requestUpdate} handleBack={goBack} />
        ) : null}
        {currentActiveForm === 6 ? (
          <PhoneNo handleNextClick={requestUpdate} handleBack={goBack} />
        ) : null}
        {/* {currentActiveForm === 7 ? (
          <Ott handleNextClick={handleNextClick} handleBack={goBack} />
        ) : null} */}
        {currentActiveForm === 7 ? (
          <UploadDoc handleNextClick={handleNextClick} handleBack={goBack} />
        ) : null}
        {/* {currentActiveForm === 9 && !isAccountVerified ? (
          <UnverifiedAccountForm />
        ) : null} */}
        {currentActiveForm === 8 &&
        (isAccountVerified == null || !isAccountVerified) ? (
          <EmailVerifyForm1
            handleNextClick={handleNextClick}
            name={currClientData?.firstName}
            email={currClientData?.email}
            handleBack={goBack}
          />
        ) : null}
        {/* {currentActiveForm === 10 && isAccountVerified ? (
          <EmailVerifyFormPopUp handleNextClick={handleNextClick} />
        ) : null} */}
        {/* {currentActiveForm === 10 && isAccountVerified ? (
          <EmailVerifyForm2 handleNextClick={handleNextClick} />
        ) : null} */}

        {currentActiveForm === 9 ? (
          <MemberShip handleNextClick={handleNextClick} handleBack={goBack} />
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
