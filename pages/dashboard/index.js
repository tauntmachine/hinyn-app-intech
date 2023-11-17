import { Box } from '@mui/material';
import DashboardHeader from '../../components/section/DashboardHeader';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NewsfeedSection from '../../components/section/NewsfeedSection';
import BrowseProjectsSection from '../../components/section/BrowseProjectsSection';
import MyProjectsSection from '../../components/section/MyProjectsSection';
export { getServerSideProps } from '../../src/store';
import {
  getClientData,
  getLoggedInUserData,
} from '../../components/forms/formService';
import ClientProjectsSection from '../../components/section/ClientProjectsSection';
import BrowseFreelancersSection from '../../components/section/BrowseFreelancersSection';
import MyFreelancersSection from '../../components/section/BrowseFreelancersSection';
import MyFreelancers from '../../components/section/MyFreelancers';

const Index = () => {
  const router = useRouter();

  const { screen, project } = router.query;
  const [currentTab, setCurrentTab] = useState(0);
  const [accountType, setAccountType] = useState(0);
  const [userData, setUserData] = useState({});
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    // if (project && screen) setCurrentTab(1);
    // if (screen === 'browse') setCurrentTab(1);
    const id = localStorage.getItem('hinyn-cid');
    if (id) {
      getClientData({ id }).then((res) => {
        if (res.data) {
          console.log('data', res);
          localStorage.setItem(
            'hinyn-client-profile',
            JSON.stringify(res.data)
          );
          setAccountType(res.data.data.attributes.accountType);
          // setUserData(res.data.data.attributes);
          console.log('index', accountType);
          // setAccountType(() => res.data?.client?.accountType);
        }
      });
    }
  }, [project, screen]);

  const handleChangeTab = (val) => {
    setCurrentTab(val);
    router.push('/dashboard');
  };

  const renderScreenSection = (param) => {
    if (accountType === 1) {
      //professional
      switch (currentTab) {
        case 0:
          return <NewsfeedSection accountType={accountType} />;
        case 1:
          return <BrowseProjectsSection mainScreen={screen} />;
        case 2:
          return <MyProjectsSection />;
        default:
          return <NewsfeedSection />;
      }
    } else if (accountType === 2) {
      //client
      switch (currentTab) {
        case 0:
          return <NewsfeedSection />;
        case 1:
          if (screen !== 'details') return <BrowseFreelancersSection />;
          return <BrowseProjectsSection mainScreen={screen} />;
        case 3:
          return <ClientProjectsSection />;
        default:
          return <MyFreelancers />;
      }
    }
  };

  //client account type = 2, professional = 1
  return (
    <Box sx={{ background: '#EBEBEB', height: 'auto', minHeight: '100vh' }}>
      <DashboardHeader
        setTabChange={handleChangeTab}
        currentTab={currentTab}
        account={accountType}
        // userData={userData}
      />
      {renderScreenSection(currentTab)}
    </Box>
  );
};

export default Index;
