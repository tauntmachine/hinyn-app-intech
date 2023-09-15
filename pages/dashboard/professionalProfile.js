import DashboardHeader from '../../components/section/DashboardHeader';
import { Box, Container, Grid } from '@mui/material';
import ContentBox from '../../components/shared/ContentBox';
import styled from '@emotion/styled';
import Image from 'next/image';
import Text, { GrayText } from '../../components/shared/Typography';
import {
  LocationIcon,
  AwardIcon,
  RoundChatIcon,
} from '../../components/shared/Icon';
import StarRating from '../../components/shared/StarRating';
import Footer from '../../components/section/Footer';
import { StaticPill, PillWithIcon } from '../../components/shared/Pill';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getClientData, getUserData } from '../../components/forms/formService';
import ImageSlider from '../../components/shared/ImageSlider';
import ReviewBox from '../../components/shared/ReviewBox';
import { CheckSquareIcon } from '../../components/shared/Icon';
import moment from 'moment';

const Row = styled(Box)`
  display: flex;
`;

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const ImageContainer = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  position: relative;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;
`;

const Name = styled(Text)`
  font-size: 32px;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
`;
const LeftBorder = styled.div`
  margin: 0 16px;
  border-left: 1px solid #e96e3f;
`;

const CustomStaticPill = styled(StaticPill)`
  color: #4aa398;
`;

const LargeIcon = styled.div`
  font-size: 20px !important;

  svg {
    color: #4aa398;
  }

  .chatIcon {
    font-size: 18px;
  }
`;

const VerticalDivider = styled.div`
  height: 2rem;
`;

const ProfessionalProfile = () => {
  const router = useRouter();
  let imgPath = '/assets/img/avatars/';
  const [clientData, setClientData] = useState([
    {
      firstName: 'Samantha',
      lastName: 'David',
      noJobs: '32',
      insta: 'samantha123',
    },
  ]);
  const [clientCategories, setClientCategories] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const { fid } = router.query;

  const reviews = [
    {
      user: 'Danny Woods',
      project: 'Danny and Kaylas Wedding',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.',
    },
    {
      user: 'Kayla Woods',
      project: 'Danny and Kaylas Wedding',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.',
    },
    {
      user: 'Danny Woods',
      project: 'Baby Shower',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci vestibulum, congue est et, lacinia neque.',
    },
  ];

  const verifications = ['Identity', 'Payment Method', 'Phone', 'Email'];

  const skills = [
    'Fashion',
    'Beauty',
    'Lifestyle',
    'Corporate',
    'E-commerce',
    'Watches / Jewelry',
    'Products',
    'Cars',
    'Sports',
    'Wedding',
    'Event',
    'Kids / Baby',
    'Animal',
    'Architecture / Real estate',
    'Food',
  ];

  const userData = {
    portfolios: [
      {
        category: 'photographer',
        title: 'Photographer Portfolio',
        projectDetails: [
          'project-temp-1.jpeg',
          'project-temp-2.jpeg',
          'project-temp-3.jpeg',
          'project-temp-4.jpeg',
        ],
      },
      {
        category: 'model',
        title: 'Model Portfolio',
        projectDetails: [
          'project-temp-5.jpeg',
          'project-temp-6.jpeg',
          'project-temp-7.jpeg',
          'project-temp-1.jpeg',
        ],
      },
    ],
  };

  useEffect(() => {
    if (fid) {
      const clientData = {
        user: {
          data: {
            id: fid,
          },
        },
      };
      getClientData(clientData).then((res) => {
        if (res?.data?.data) {
          console.log('res data', res?.data?.data);
        }
      });
    }
    const clientData = {
      id: localStorage.getItem('hinyn-cid'),
    };
    getClientData(clientData).then((res) => {
      if (res?.data?.data) {
        setClientData(() => res?.data?.data?.attributes);
        if (res?.data?.data?.attributes?.categories?.data)
          setClientCategories(
            () => res?.data?.data?.attributes?.categories?.data
          );
      }
    });
  }, [fid]);

  const handleChangeTab = (val) => {
    setCurrentTab(val);
    router.push('/dashboard');
  };

  return (
    <Box sx={{ background: '#EBEBEB', height: 'auto' }}>
      <DashboardHeader setTabChange={handleChangeTab} currentTab={currentTab} />

      <Footer />
    </Box>
  );
};

export default ProfessionalProfile;
