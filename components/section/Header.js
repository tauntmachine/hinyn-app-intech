import styled from "@emotion/styled";
import Button from "../shared/Button";
import SearchBar from "../shared/SearchBar";
import { Box } from "@mui/material";
import {FiGlobe} from "react-icons/fi";
import { Container } from "@mui/system";

const CustomGlobeIcon = styled(FiGlobe)`
  margin-top:4px;
  font-size: 20px;

  &:hover{
    color: #EB4C60;
  }
`
const CustomBox = styled(Box)`
  box-shadow: 0px 3px 30px #00000029;
  background: #FFFFFF;
  height: 5.625rem;
  position: sticky;
  top:0;
  left:0;
  right: 0;
  z-index: 10;
`
const Head = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`
const LoginContainer = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
  justify-content: space-evenly;
`
const Logo = styled.div`
  font-size: 40px;
  font-weight: 600;
`


function Header() {
  return (
    <CustomBox>
      <Head maxWidth="xl">
        <Logo>hinyn.</Logo>
        <SearchBar />
        <LoginContainer>
          <Button>Create an account</Button>
          <span>Login</span>
          <span><CustomGlobeIcon /></span>
        </LoginContainer>
      </Head>
    </CustomBox>
  )
}

export default Header