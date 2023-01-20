import { useState, useEffect} from "react";
import { useRouter } from "next/router";
import { Box} from "@mui/material";
import AllProjectsSection from "./AllProjectsSection";
import ProjectDetailsSection from "./ProjectDetailsSection";

export const SCREENS = {
    list : 'list',
    details: 'details'
}
const BrowseProjectsSection = ({mainScreen}) => {
  const router = useRouter();
  const { project } = router.query;
  
  const [currentScreen, setCurrentScreen] = useState(SCREENS.list);

  useEffect(() => {
    console.log('inside browse', mainScreen, currentScreen)
    if(mainScreen === SCREENS.details) setCurrentScreen(() => SCREENS.details);
    else setCurrentScreen(() => SCREENS.list);

  });
  
  const handleScreenChange = (screen, projectId) => {
    setCurrentScreen(() => screen);
  }


  return (
    <Box sx={{background:'#EBEBEB', height:'auto'}}>
    {currentScreen === SCREENS.list
        ? <AllProjectsSection handleScreenChange={handleScreenChange}/>
        :  <ProjectDetailsSection projectId={project} />
    }
    </Box>
  )
}

export default BrowseProjectsSection