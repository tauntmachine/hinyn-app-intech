import React from 'react';
import { GooeyLoader2 } from 'react-loaders-kit';
// import Typed from 'react-typed';

function Loader() {
  const loaderProps = {
    loading: true,
    size: 80,
    duration: 1,
    color: 'linear-gradient(to right, #FF5A5F,#A52226 )',
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
