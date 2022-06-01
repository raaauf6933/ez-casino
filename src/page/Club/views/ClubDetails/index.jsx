import React from 'react';
import { useParams } from 'react-router-dom';
const ClubDetails = () => {
  const params = useParams();
  console.log(params);
  return (
    <>
      <span>ClubDetails</span>
    </>
  );
};

export default ClubDetails;
