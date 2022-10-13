import Head from 'next/head';
import type { NextPage } from 'next';
import Header from '../components/section/Header';
import Main from '../components/section/Main';
import Footer from '../components/section/Footer';



const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet" />
      </Head>
      <Header />
      <Main />
      <Footer/>
    </>
  );
};

export default Home;
