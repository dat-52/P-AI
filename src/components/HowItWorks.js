import React from 'react';
import styled from 'styled-components';

const HowItWorksSection = styled.section`
  padding: 6rem 2rem;
  background: #0a0a0a;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 4rem;
  background: linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StepsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  position: relative;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 1.5rem;
`;

const StepIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #4ECDC4;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const StepDescription = styled.p`
  color: #888;
  line-height: 1.6;
`;

const steps = [
  {
    number: 1,
    icon: '👛',
    title: 'Connect Your Wallet',
    description: 'Install MetaMask and connect your wallet to access the PI.AI platform.'
  },
  {
    number: 2,
    icon: '💎',
    title: 'Buy $PAI Tokens',
    description: 'Purchase $PAI tokens through our platform or supported exchanges.'
  },
  {
    number: 3,
    icon: '🤖',
    title: 'Start Using AI Services',
    description: 'Use your $PAI tokens to access and utilize our decentralized AI services.'
  }
];

const HowItWorks = () => {
  return (
    <HowItWorksSection id="how-it-works">
      <SectionTitle>How It Works</SectionTitle>
      <StepsContainer>
        {steps.map((step, index) => (
          <StepCard key={index}>
            <StepNumber>{step.number}</StepNumber>
            <StepIcon>{step.icon}</StepIcon>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </StepCard>
        ))}
      </StepsContainer>
    </HowItWorksSection>
  );
};

export default HowItWorks; 