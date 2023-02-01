import { Box } from "@mui/material";
import DashboardHeader from "../../components/section/DashboardHeader";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NewsfeedSection from "../../components/section/NewsfeedSection";
import BrowseProjectsSection from "../../components/section/BrowseProjectsSection";
import MyProjectsSection from "../../components/section/MyProjectsSection";
export {getServerSideProps} from "../../src/store";
import { getLoggedInUserData } from "../../components/forms/formService";

const Index = () => {
  const router = useRouter();
  const { screen,project } = router.query;
  const [currentTab, setCurrentTab] = useState(0);
  const [accountType, setAccountType] = useState(1);


  useEffect(() => {
    if(project && screen) setCurrentTab(1);
    if(screen === 'browse') setCurrentTab(1);
    const clientId = localStorage.getItem('hinyn-cid');
    if(clientId){
      getLoggedInUserData().then((res)=>{
        if(res.data){ 
          setAccountType(()=>res.data?.client?.accountType)
        }
      })
    }
  },[project,screen]);

  const handleChangeTab = (val) => {
      setCurrentTab(val)
      router.push('/dashboard')
    }
  return (
    <Box sx={{background:'#EBEBEB', height:'auto'}}>
        <DashboardHeader setTabChange={handleChangeTab} currentTab={currentTab}/>
        {currentTab === 0 ? <NewsfeedSection /> : null }
        {currentTab === 1 ? <BrowseProjectsSection mainScreen={screen} /> : null }
        {currentTab === 2 && accountType === 1 ? <MyProjectsSection /> : null }
        {currentTab === 2 && accountType === 2 ? null : null }
        {currentTab === 3 && accountType === 2 ? <MyProjectsSection /> : null }
    </Box>
  )
}

export default Index