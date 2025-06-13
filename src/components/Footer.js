import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #0a0a0a;
  padding: 4rem 2rem;
  color: #fff;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 4rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  color: #4ECDC4;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: #888;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #4ECDC4;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: #888;
`;

const footerSections = [
  {
    title: 'Product',
    links: [
      { name: 'Features', url: '#' },
      { name: 'Token', url: '#' },
      { name: 'Roadmap', url: '#' },
      { name: 'Documentation', url: '#' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About', url: '#' },
      { name: 'Careers', url: '#' },
      { name: 'Blog', url: '#' },
      { name: 'Press', url: '#' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Help Center', url: '#' },
      { name: 'API', url: '#' },
      { name: 'Status', url: '#' },
      { name: 'Terms of Service', url: '#' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', url: '#' },
      { name: 'Terms of Use', url: '#' },
      { name: 'Cookie Policy', url: '#' },
      { name: 'Disclaimer', url: '#' }
    ]
  }
];

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        {footerSections.map((section, index) => (
          <FooterSection key={index}>
            <FooterTitle>{section.title}</FooterTitle>
            {section.links.map((link, linkIndex) => (
              <FooterLink key={linkIndex} href={link.url}>
                {link.name}
              </FooterLink>
            ))}
          </FooterSection>
        ))}
      </FooterContent>
      <FooterBottom>
        <p>© 2024 PI.AI. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 