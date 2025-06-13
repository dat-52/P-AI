import React from 'react';
import styled from 'styled-components';

const RoadmapSection = styled.section`
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

const Timeline = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, #FF6B6B 0%, #4ECDC4 100%);
  }
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: ${props => props.align === 'left' ? 'flex-start' : 'flex-end'};
  margin-bottom: 4rem;
  position: relative;
  width: 50%;
  margin-left: ${props => props.align === 'right' ? 'auto' : '0'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    ${props => props.align === 'left' ? 'right: -20px;' : 'left: -20px;'}
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4ECDC4;
  }
`;

const TimelineContent = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
  width: 80%;
`;

const TimelineDate = styled.div`
  color: #4ECDC4;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const TimelineTitle = styled.h3`
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const TimelineDescription = styled.p`
  color: #888;
  line-height: 1.8;
  white-space: pre-line;
`;

const roadmapItems = [
  {
    date: 'Q1 2025',
    title: 'Ideation & Foundation',
    description: '• Conceptualization of Pi.AI as an AI-driven blockchain project\n• Design and development of tokenomics for the $PAI ecosystem\n• Initial team formation and strategic planning',
    align: 'left'
  },
  {
    date: 'Q2 2025',
    title: 'Launch & Community Building',
    description: '• Launch of the official landing page for IDO\n• Token Generation Event (TGE) and public IDO sale of $PAI\n• Launch of staking platform for early adopters and supporters',
    align: 'right'
  },
  {
    date: 'Q3 2025',
    title: 'AI Core Development',
    description: '• Start of Pi AI product development (core AI engine and use cases)\n• Formation of partnerships for data, infrastructure, and AI integration\n• Community engagement and feedback collection for AI features',
    align: 'left'
  },
  {
    date: 'Q4 2025',
    title: 'Product & Market Expansion',
    description: '• Launch of Pi AI application (Web or Mobile)\n• Listing of $PAI token on centralized exchanges (CEXs)\n• Growth marketing campaigns and ecosystem expansion initiatives',
    align: 'right'
  }
];

const Roadmap = () => {
  return (
    <RoadmapSection id="roadmap">
      <SectionTitle>Roadmap</SectionTitle>
      <Timeline>
        {roadmapItems.map((item, index) => (
          <TimelineItem key={index} align={item.align}>
            <TimelineContent>
              <TimelineDate>{item.date}</TimelineDate>
              <TimelineTitle>{item.title}</TimelineTitle>
              <TimelineDescription>{item.description}</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </RoadmapSection>
  );
};

export default Roadmap; 