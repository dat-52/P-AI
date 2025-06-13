import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(180deg, #000000 0%, #1a1a1a 100%);
  margin-top: 80px; /* Add margin to account for fixed header */
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #888;
  max-width: 600px;
`;

const Hero = () => {
  return (
    <HeroSection>
      <Title>Welcome to PI.AI</Title>
      <Subtitle>
        The future of decentralized AI infrastructure
      </Subtitle>
    </HeroSection>
  );
};

export default Hero; 