import React from 'react';
import MainBg from '../../assets/img/main-bg.jpg';

function Main() {
  return (
    <>
      <img
        style={{
          marginTop: '50px',
          marginLeft: '15%',
          borderRadius: '10px',
          height: '700px',
          width: '70%',
        }}
        src={MainBg}
        alt="Main page"
      />
    </>
  );
}

export default Main;
