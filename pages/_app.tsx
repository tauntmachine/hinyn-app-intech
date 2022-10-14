import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import theme from '../components/ThemeConfig';
import '../styles/globals.css';
import {FreelancerProvider} from "../src/store"
;
function MyApp({ Component, pageProps }: AppProps) {
  return(
    //@ts-ignore
      <FreelancerProvider freelancer={pageProps.freelancer}>
        <ThemeProvider theme={theme}>

        <Component {...pageProps} />
        </ThemeProvider>

      </FreelancerProvider>
  )
}

export default MyApp;
