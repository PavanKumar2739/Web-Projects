import { Button } from 'bootstrap';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnderDevelopmentPage = () => {
    const navigate = useNavigate();
  const navigateBack=()=>{
    navigate('/');
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Page Under Development</h1>
      <p>We're sorry, but this page is currently under development.</p>
      <p>Please check back later.</p>
      <button onClick={navigateBack}>Back</button>
    </div>
  );
}

export default UnderDevelopmentPage;
