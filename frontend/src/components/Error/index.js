import React from 'react';

function Error({ error }) {
  return (
    <span
      style={{
        color: 'red',
        fontWeight: 'bold',
      }}
    >
      {error}
    </span>
  );
}

export default Error;
