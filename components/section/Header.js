import styled from '@emotion/styled';
import Button from '../shared/Button';
import SearchBar from '../shared/searchBar/SearchBar';
import { Box } from '@mui/material';
import { FiGlobe } from 'react-icons/fi';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import ExpandedSearchBar from '../shared/searchBar/ExpandedSearchBar';
import RegistrationForm from '../forms/RegistrationForm';
import Modal from '../shared/Modal';
import Logo2 from '../shared/Logo2';
import LoginForm from '../forms/LoginForm';
import BidFreelancerForm from '../forms/BidFreelancerForm';
import PhoneNo from '../forms/PhoneNo';
import { getClientData, getClients, logoutUser } from '../forms/formService';
import Image from 'next/image';
import { useFreelancer } from '../../src/store';
const CustomGlobeIcon = styled(FiGlobe)`
  margin-top: 4px;
  font-size: 20px;

  &:hover {
    color: #eb4c60;
  }
`;
const LogoDiv = styled.div`
  position: relative;
  width: 8rem;
  height: 2rem;
  cursor: pointer;
  background: green;
`;
// const SearchAdjust = styled.div``;
const CustomBox = styled(Box)`
  box-shadow: 0px 3px 30px #00000029;
  background: #ffffff;
  padding: 1.5rem 7rem;

  max-height: ${(props) => (props.isExpanded ? '170px' : '90px')};

  width: 100%;
  transition: all 0.5s ease-in-out;
`;
const ParentContainer = styled.div`
  display: flex;
  justify-content: center;
  position: sticky;
  z-index: 10;
  top: 0;
`;
const Head = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-content: space-between;
  align-items: center;
  height: auto;
`;
const LoginContainer = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
  justify-content: space-evenly;
`;
const LinkText = styled.div`
  cursor: pointer;

  &:hover {
    color: #4aa398;
  }
`;

const ExpandedSearchBarContainer = styled.div`
  transition: all 0.5s ease;
`;

const Header = () => {
  const { categories } = useFreelancer();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem('hinyn-cjwt')) {
      setIsLoggedIn(() => true);
    } else setIsLoggedIn(() => false);
  }, [isLoggedIn]);

  const toggleIsExpanded = () => {
    setIsExpanded(() => !isExpanded);
  };
  const closeIt = () => {
    {
      isExpanded ? setIsExpanded(false) : '';
    }
  };
  const [open, setOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    handleClose();
  };

  const showForm = (form) => {
    setOpen(true);
    setCurrentForm(form);
  };

  const handleLogging = () => {
    if (isLoggedIn) logoutUser();
    else showForm('login');
    setIsLoggedIn(() => !isLoggedIn);
    return localStorage.getItem('hinyn-cjwt') ? true : false;
  };

  const handleCloseExpandedSearchBar = (val) => {
    setIsExpanded(() => val);
  };

  return (
    <ParentContainer>
      <CustomBox isExpanded={isExpanded}>
        <Head maxWidth="xl">
          <Logo2 />
          {/* <SearchAdjust> */}
          <SearchBar
            toggleIsExpanded={toggleIsExpanded}
            isExpanded={isExpanded}
          />
          {/* </SearchAdjust> */}
          <LoginContainer>
            {isLoggedIn ? (
              ''
            ) : (
              <Button onClick={() => showForm('register')}>
                Create an account
              </Button>
            )}
            {isLoggedIn ? (
              <LinkText onClick={() => handleLogging()}>Logout</LinkText>
            ) : (
              <LinkText onClick={() => handleLogging()}>Login</LinkText>
            )}

            <span>
              <CustomGlobeIcon />
            </span>
          </LoginContainer>
        </Head>
        {isExpanded ? (
          <ExpandedSearchBarContainer>
            <ExpandedSearchBar
              handleCloseExpandedSearchBar={handleCloseExpandedSearchBar}
            />
          </ExpandedSearchBarContainer>
        ) : // </SearchAdjust>
        null}
      </CustomBox>
      <Modal
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
      >
        {currentForm === 'register' ? <RegistrationForm /> : <LoginForm />}
      </Modal>
    </ParentContainer>
  );
};

export default Header;
