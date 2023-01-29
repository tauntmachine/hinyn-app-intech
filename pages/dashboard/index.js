import { Box } from "@mui/material";
import DashboardHeader from "../../components/section/DashboardHeader";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NewsfeedSection from "../../components/section/NewsfeedSection";
import BrowseProjectsSection from "../../components/section/BrowseProjectsSection";
import MyProjectsSection from "../../components/section/MyProjectsSection";
export {getServerSideProps} from "../../src/store";

const Index = () => {
  const router = useRouter();
  const { screen,project } = router.query;
  const [currentTab, setCurrentTab] = useState(0);

  const userType = 2;   //1=professional 2=client

  useEffect(() => {
    if(project && screen) setCurrentTab(1);
    if(screen === 'browse') setCurrentTab(1);
  },[project,screen]);

  const handleChangeTab = (val) => {
      setCurrentTab(val)
      router.push('/dashboard')
    }
  return (
    <Box sx={{background:'#EBEBEB', height:'auto'}}>
        <DashboardHeader setTabChange={handleChangeTab} currentTab={currentTab} userType={userType} />
        {currentTab === 0 ? <NewsfeedSection userType={userType} /> : null }
        {currentTab === 1 ? <BrowseProjectsSection mainScreen={screen} /> : null }
        {currentTab === 2 && userType === 1 ? <MyProjectsSection /> : null }
        {currentTab === 2 && userType === 2 ? null : null }
        {currentTab === 3 && userType === 2 ? <MyProjectsSection /> : null }
    </Box>
  )
}

export default Index