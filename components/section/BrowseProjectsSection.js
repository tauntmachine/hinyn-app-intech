import { Box, Typography,Grid, Container} from "@mui/material";
import { useState } from "react";
import styled from "@emotion/styled";
import AllProjectsSection from "./AllProjectsSection";
import ProjectDetailsSection from "./ProjectDetailsSection";

export const SCREENS = {
    default : 'default',
    details: 'details'
}
const BrowseProjectsSection = () => {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.details);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleScreenChange = (screen, projectId) => {
    setCurrentScreen(() => screen);
  }

  return (
    <Box sx={{background:'#EBEBEB', height:'auto'}}>
    {currentScreen === SCREENS.default
        ? <AllProjectsSection handleScreenChange={handleScreenChange}/>
        : <ProjectDetailsSection />
    }
    </Box>
  )
}

export default BrowseProjectsSection