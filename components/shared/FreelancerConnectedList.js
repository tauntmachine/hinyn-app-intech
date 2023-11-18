import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import Text, { GrayText } from './Typography';
import Pill from './Pill';
import StarRating from './StarRating';
import { RedButton } from './Button';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getLoggedInUserData, getProposalsOfBid } from '../forms/formService';
import { LocationIcon } from './Icon';
import Image from 'next/image';
import { relative } from 'path';
import { useFreelancer } from '../../src/store';

const MainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
  row-gap: 16px;
  padding: 32px;
  min-height: 200px;
`;

const Row = styled(Box)`
  display: flex;
`;
const Column = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  color: #eb4c60;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;
const CustomRedButton = styled(RedButton)`
  background: linear-gradient(110deg, #ff5a5f 0%, #a52226 100%);
  color: #ffffff;
  border: none;
  position: absolute;
  right: 0;

  &:hover {
    border: none;
    background: linear-gradient(110deg, #a52226 0%, #ff5a5f 100%);
    color: #ffffff;
  }
`;

const ImageContainer = styled.div`
  width: 6rem;
  height: 6rem;
  position: relative;
  border-radius: 9px;
  box-shadow: 0px 3px 6px #00000029;
`;
const StyledImage = styled(Image)`
  border-radius: 9px;
`;

const FreelancerConnectedList = () => {
  const { freelancer } = useFreelancer();
  const imgPath = '/assets/img/avatars/';
  const router = useRouter();
  const [accountType, setAccountType] = useState({});

  const showFreelancerProfile = (freelancerId) => {
    // console.log(freelancerId);
    router.push('/dashboard/professionalProfile?fid=' + freelancerId);
  };

  useEffect(() => {
    getLoggedInUserData().then((res) => {
      if (res?.data?.client) {
        setAccountType(() => res?.data?.client?.accountType);
        // console.log(freelancer);
      }
    });
  }, []);

  return (
    <Box>
      {freelancer.map((freelancer, idx) => {
        return (
          <MainContainer key={idx}>
            <Row sx={{ gap: '2rem', width: '100%' }}>
              <Column sx={{ flexBasis: '10%' }}>
                <ImageContainer>
                  <StyledImage
                    src={
                      freelancer?.displayPhoto
                        ? imgPath + freelancer?.displayPhoto
                        : imgPath + 'img-avatar2.png'
                    }
                    layout="fill"
                    alt="icon-img"
                  />
                </ImageContainer>
              </Column>
              <Column sx={{ flexBasis: '90%' }}>
                <Row
                  sx={{
                    gap: '14px',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <Text color="red">
                      <b>
                        {freelancer?.attributes.firstName}{' '}
                        {freelancer?.attributes.lastName}
                      </b>
                    </Text>
                    <GrayText style={{ marginLeft: '12px' }}>
                      {' '}
                      {freelancer?.attributes.instagramProfile ?? ''}{' '}
                    </GrayText>
                  </Box>
                  <Box>
                    <CustomRedButton
                      onClick={() => showFreelancerProfile(freelancer?.id)}
                    >
                      Hire Me
                    </CustomRedButton>
                  </Box>
                </Row>
                <Row sx={{ gap: '8px', alignItems: 'center' }}>
                  <LocationIcon />
                  <GrayText>
                    {' '}
                    {freelancer?.attributes.city},{' '}
                    {freelancer?.attributes.country ?? 'UAE'}
                  </GrayText>
                </Row>
                <Row>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                      paddingY: '5px',
                    }}
                  >
                    <StarRating
                      data={freelancer?.attributes.rating ?? 3}
                      sz="lg"
                    />
                    <GrayText>
                      {' '}
                      {freelancer?.attributes.categories?.data[0]?.attributes
                        ?.title ?? ''}{' '}
                    </GrayText>
                  </Box>
                </Row>
                <Row>
                  <Box sx={{ display: 'flex' }}>
                    <GrayText>
                      {' '}
                      {freelancer?.attributes.description ?? ''}{' '}
                    </GrayText>
                  </Box>
                </Row>
              </Column>
            </Row>
          </MainContainer>
        );
      })}
    </Box>
  );
};

export default FreelancerConnectedList;
