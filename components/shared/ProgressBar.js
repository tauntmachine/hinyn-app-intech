import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';
import styled from '@emotion/styled';

const StyledLinearProgress = styled(LinearProgress)`
    border-radius: 5;
    height: 8px;
    margin: 1rem 0;
   
    background-color: #ffffff;

    .MuiLinearProgress-bar{
        background: linear-gradient(90deg, #4AA398 0%, #207C70 100%) 0% 0% no-repeat padding-box;
    }
`

export default function LinearDeterminate() {
  const [progress, setProgress] = useState(10);

  return (
    <Box sx={{ width: '100%' }}>
      <StyledLinearProgress variant="determinate" value={progress}/>
    </Box>
  );
}
