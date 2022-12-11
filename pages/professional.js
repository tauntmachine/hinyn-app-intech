import styled from "@emotion/styled";
import { Box, Container } from "@mui/material";
import Logo from "../components/shared/Logo";
import ProgressBar from "../components/shared/ProgressBar";
import ProfessionalForm1 from "../components/forms/ProfessionalForm1";
import ProfessionalForm2 from "../components/forms/ProfessionalForm2";
import { useState } from "react";

const MainBox = styled(Box)`
    background-color: #F0F0F0;
    width: 100%;
    height: auto;
    min-height: 100vh;
    overflow: auto;
`


function CreateProfessionalAccount() {
  const [progressPercent, setProgressPercent] = useState(10);
  const [currentActiveForm, setCurrentActiveForm] = useState(1);

  const handleNextClick = (value) => {
    if(value){
      setProgressPercent(progressPercent+10)
      setCurrentActiveForm((prev)=> prev + 1);
    }
  }

  return (
    <MainBox>
      <Container maxWidth="xl" sx={{padding:"1rem 0"}}>
        <Logo />
      </Container>
      <ProgressBar progress={progressPercent}/>
      { currentActiveForm === 1 ? <ProfessionalForm1 handleNextClick={handleNextClick} /> : null }
      { currentActiveForm === 2 ? <ProfessionalForm2 handleNextClick={handleNextClick} /> : null }
    </MainBox>
  )
}

export default CreateProfessionalAccount;