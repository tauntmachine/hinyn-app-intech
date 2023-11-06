import Head from 'next/head';
import Header from '../components/section/Header';
import Main from '../components/section/Main';
import Footer from '../components/section/Footer';
// import Layout from '../components/Layout';
export { getServerSideProps } from '../src/store';

const Home = () => {
  return (
    <>
      <Head>
        <title>Home App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* <Layout> */} {/* Wrap your content with the Layout component */}
      <Header />
      <Main />
      <Footer />
      {/* </Layout> */}
    </>
  );
};

export default Home;
