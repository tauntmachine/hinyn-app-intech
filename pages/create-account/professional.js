import styled from "@emotion/styled";
import { Container } from "@mui/material";
import Logo from "../../components/shared/Logo";
import ProgressBar from "../../components/shared/ProgressBar";
import ProfessionalForm1 from "../../components/forms/ProfessionalForm1";

const MainContainer = styled(Container)`
    background-color: #F0F0F0;
    width: 100%;
    height: auto;
    min-height: 100vh;
`


function CreateProfessionalAccount() {
  return (
    <MainContainer maxWidth="xl">
        <Logo />
        <ProgressBar />
        <ProfessionalForm1 />
    </MainContainer>
  )
}

export default CreateProfessionalAccount;