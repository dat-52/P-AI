import React from 'react';
import { useEffect, useState } from "react";
import styled from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Tokenomics from './components/Tokenomics';
import IDO from './components/IDO';
import HowItWorks from './components/HowItWorks';
import Roadmap from './components/Roadmap';
import Community from './components/Community';
import Footer from './components/Footer';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #000;
  color: #fff;
  font-family: 'Inter', sans-serif;
`;

function App() {


  return (
    <AppContainer>
      <Header />
      <Hero />
      <Features />
      <Tokenomics />
      <IDO />
      <HowItWorks />
      <Roadmap />
      <Community />
      <Footer />
    </AppContainer>
  );
}

export default App;