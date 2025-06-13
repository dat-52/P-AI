import React from 'react';
import styled from 'styled-components';

const CommunitySection = styled.section`
  padding: 6rem 2rem;
  background: #000;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 4rem;
  background: linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CommunityContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #4ECDC4;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 1.1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem 2rem;
  border-radius: 50px;
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const communityStats = [
  { value: '50K+', label: 'Community Members' },
  { value: '100+', label: 'AI Models' },
  { value: '24/7', label: 'Support' },
  { value: '10+', label: 'Countries' }
];

const socialLinks = [
  { name: 'Twitter', icon: '𝕏', url: '#' },
  { name: 'Telegram', icon: '📱', url: '#' },
  
];

const Community = () => {
  return (
    <CommunitySection id="community">
      <SectionTitle>Join Our Community</SectionTitle>
      <CommunityContainer>
        <StatsGrid>
          {communityStats.map((stat, index) => (
            <StatCard key={index}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
        <SocialLinks>
          {socialLinks.map((link, index) => (
            <SocialLink key={index} href={link.url} target="_blank" rel="noopener noreferrer">
              <span>{link.icon}</span>
              {link.name}
            </SocialLink>
          ))}
        </SocialLinks>
      </CommunityContainer>
    </CommunitySection>
  );
};

export default Community; 