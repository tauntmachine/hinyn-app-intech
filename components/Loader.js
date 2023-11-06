import React from 'react';
import { GooeyLoader2 } from 'react-loaders-kit';
// import Typed from 'react-typed';

function Loader() {
  const loaderProps = {
    loading: true,
    size: 175,
    duration: 2,
    colors: ['#009999', '#00cccc', '#00ffff'],
  };

  return (
    <div className="loader">
      <GooeyLoader2 {...loaderProps} />
      {/* <Typed
        className="loader-text"
        strings={['Loading...']}
        typeSpeed={60}
        backSpeed={0}
      /> */}
    </div>
  );
}

export default Loader;
