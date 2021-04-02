import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';

function BackButton() {
  const history = useHistory();

  function goToDashboard() {
    history.push('/dashboard');
  }
  return (
    <Button
      style={{
        backgroundColor: '#8782D6',
        color: 'white',
        fontWeight: 'bold',
        height: '50px',
      }}
      onClick={() => {
        goToDashboard();
      }}
    >
      Back
    </Button>
  );
}

export default BackButton;
