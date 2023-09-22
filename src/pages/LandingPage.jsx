import React, { useEffect } from 'react';
import Hero from '../components/landingPage/Hero';
import '../assets/scss/landingPage.scss';
import Connect from '../components/landingPage/Connect';
import Testimonial from '../components/landingPage/Testimonial';

const LandingPage = () => {
  return (
    <main className='landing-page'>
      <Hero />
      <Connect />
      <Testimonial />
    </main>
  );
};

export default LandingPage;
