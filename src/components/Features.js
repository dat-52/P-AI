import React from 'react';
import styled from 'styled-components';

const FeaturesSection = styled.section`
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #4ECDC4;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const FeatureDescription = styled.p`
  color: #888;
  line-height: 1.6;
`;

const features = [
  {
    icon: '🚀',
    title: 'Decentralized AI',
    description: 'Access powerful AI models through a decentralized network of providers.'
  },
  {
    icon: '💎',
    title: 'Token Economics',
    description: 'Participate in the ecosystem through our native $PAI token.'
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your data remains private and secure with our advanced encryption.'
  },
  {
    icon: '🌐',
    title: 'Global Network',
    description: 'Connect with AI providers and users worldwide.'
  }
];

const Features = () => {
  return (
    <FeaturesSection id="features">
      <SectionTitle>Features</SectionTitle>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  );
};

export default Features; 