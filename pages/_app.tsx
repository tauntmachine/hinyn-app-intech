import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import theme from '../components/ThemeConfig';
import '../styles/globals.css';
import { FreelancerProvider, ProjectProvider } from '../src/store';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <FreelancerProvider freelancer={pageProps['freelancer']}>
        <ProjectProvider project={pageProps['project']}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ProjectProvider>
      </FreelancerProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
