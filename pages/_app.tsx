import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import theme from '../components/ThemeConfig';
import '../styles/globals.css';
import {FreelancerProvider, ProjectProvider} from "../src/store"

function MyApp({ Component, pageProps }: AppProps) {
  return(
        <FreelancerProvider freelancer={pageProps["freelancer"]} >      
          <ProjectProvider project={pageProps["project"]}>
            <ThemeProvider theme={theme}>

            <Component {...pageProps} />
            </ThemeProvider>
          </ProjectProvider>    
        </FreelancerProvider>
  )
}

export default MyApp;
