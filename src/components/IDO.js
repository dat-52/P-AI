import React from 'react';
import styled from 'styled-components';

const IDOSection = styled.section`
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

const IDOContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const IDOInfo = styled.div`
  color: #fff;
`;

const IDOTitle = styled.h3`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #4ECDC4;
`;

const IDODescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #888;
  margin-bottom: 2rem;
`;

const TokenStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
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

const ReferralStats = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 20px;
  color: #fff;
`;

const ReferralTitle = styled.h4`
  font-size: 1.5rem;
  color: #4ECDC4;
  margin-bottom: 1.5rem;
`;

const IDO = () => {
  const totalTokens = 1000000000; // 1B tokens total supply
  const staticTotalSold = "125,000,000"; // Giá trị tĩnh để giới thiệu
  const staticProgress = "12.5"; // Giá trị tĩnh cho phần trăm tiến độ

  return (
    <IDOSection id="ido">
      <SectionTitle>IDO Sale</SectionTitle>
      <IDOContainer>
        <IDOInfo>
          <IDOTitle>Join Our Token Sale</IDOTitle>
          <IDODescription>
            Participate in our Initial DEX Offering (IDO) and be among the first to own $PAI tokens.
            The IDO price is set at 600,000 $PAI tokens per BNB.
            Fixed fee: 0.008 BNB per transaction.
          </IDODescription>
          <TokenStats>
            <StatItem>
              <StatValue>{totalTokens.toLocaleString()}</StatValue>
              <StatLabel>Total Supply</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{staticTotalSold}</StatValue>
              <StatLabel>Tokens Sold</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{staticProgress}%</StatValue>
              <StatLabel>Progress</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>600K</StatValue>
              <StatLabel>Tokens per BNB</StatLabel>
            </StatItem>
          </TokenStats>
        </IDOInfo>
        <ReferralStats>
          <ReferralTitle>Referral Program</ReferralTitle>
          <IDODescription>
            Invite your friends and earn rewards. Details about the referral program will be available soon.
          </IDODescription>
        </ReferralStats>
      </IDOContainer>
    </IDOSection>
  );
};

export default IDO; 