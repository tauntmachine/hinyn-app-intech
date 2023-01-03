import styled from "@emotion/styled";
import Button from "../shared/Button";
import SearchBar from "../shared/searchBar/SearchBar";
import { Box } from "@mui/material";
import {FiGlobe} from "react-icons/fi";
import { Container } from "@mui/system";
import { useState } from "react";
import ExpandedSearchBar from "../shared/searchBar/ExpandedSearchBar";
import RegistrationForm from "../forms/RegistrationForm";
import Modal from "../shared/Modal";
import Logo from "../shared/Logo";
import LoginForm from "../forms/LoginForm";


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
  height: auto;
  padding: 1rem 0;
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
const LinkText = styled.div`
  cursor: pointer;

  &:hover{
    color: #EB4C60;
  }
`


function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = () => {
    setIsExpanded(()=> !isExpanded);
  }
  const [open, setOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    console.log('Submitted form!'); 
    handleClose();
  }

  const showForm = (form) => {
    setOpen(true);
    setCurrentForm(form);
  }



  return (
    <>
    <CustomBox>
      <Head maxWidth="xl">
        <Logo />
        <SearchBar toggleIsExpanded={toggleIsExpanded} isExpanded={isExpanded}/>
        <LoginContainer>
          <Button onClick={()=>showForm('register')}>Create an account</Button>
          <LinkText onClick={()=> showForm('login')}>Login</LinkText>
          <span><CustomGlobeIcon /></span>
        </LoginContainer>
      </Head>
      { isExpanded ? 
        <ExpandedSearchBar></ExpandedSearchBar>
        : null
      }
    </CustomBox>
    <Modal handleClose={handleClose} handleSubmit={handleSubmit} isOpen={open} hasHeader={false} hasFooter={false}>
          {currentForm === 'register' ? <RegistrationForm /> : <LoginForm />}
    </Modal>
    </>
  )
}

export default Header