import React from 'react';
import styled from 'styled-components';

const TokenSection = styled.section`
  padding: 6rem 2rem;
  background: #000;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(78, 205, 196, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 4rem;
  background: linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TokenContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TokenInfo = styled.div`
  color: #fff;
`;

const TokenTitle = styled.h3`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #4ECDC4;
`;

const TokenDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #888;
  margin-bottom: 2rem;
`;

const TokenStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 15px;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #4ECDC4;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 1rem;
`;

const TokenImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
`;

const Token = () => {
  const tokenStats = [
    { value: '1B', label: 'Total Supply' },
    { value: '40%', label: 'IDO Sale' },
    { value: '20%', label: 'Liquidity' },
    { value: '20%', label: 'Marketing & Growth' },
    { value: '10%', label: 'Team & Advisors' },
    { value: '10%', label: 'Staking Rewards' }
  ];

  return (
    <TokenSection id="token">
      <SectionTitle>$PAI Tokenomics</SectionTitle>
      <TokenContainer>
        <TokenInfo>
          <TokenTitle>The Power of Decentralized AI</TokenTitle>
          <TokenDescription>
            $PAI is the native utility token that powers the PI.AI ecosystem.
            It enables access to AI services, governance participation, and rewards
            for network contributors.
          </TokenDescription>
          <TokenStats>
            {tokenStats.map((stat, index) => (
              <StatItem key={index}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </TokenStats>
        </TokenInfo>
        <TokenImage>$PAI</TokenImage>
      </TokenContainer>
    </TokenSection>
  );
};

export default Token; 