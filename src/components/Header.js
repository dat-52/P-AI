import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #4ECDC4;
  }
`;

const ConnectButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background: linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%);
  border: none;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  padding: 2rem;
  z-index: 1001;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLaunchApp = () => {
    navigate('/dapp');
  };

  return (
    <>
      <HeaderContainer>
        <Logo>PI.AI</Logo>
        <Nav>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#token">Tokenomics</NavLink>
          <NavLink href="#ido">IDO</NavLink>
          <NavLink href="#how-it-works">How it Works</NavLink>
          <NavLink href="#roadmap">Roadmap</NavLink>
          <NavLink href="#community">Community</NavLink>
        </Nav>
        <ConnectButton onClick={handleLaunchApp}>
          Launch App
        </ConnectButton>
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </MobileMenuButton>
      </HeaderContainer>
      <MobileMenu isOpen={isMobileMenuOpen}>
        <Logo>PI.AI</Logo>
        <NavLink href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</NavLink>
        <NavLink href="#token" onClick={() => setIsMobileMenuOpen(false)}>Token</NavLink>
        <NavLink href="#ido" onClick={() => setIsMobileMenuOpen(false)}>IDO</NavLink>
        <NavLink href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How it Works</NavLink>
        <NavLink href="#roadmap" onClick={() => setIsMobileMenuOpen(false)}>Roadmap</NavLink>
        <NavLink href="#community" onClick={() => setIsMobileMenuOpen(false)}>Community</NavLink>
        <ConnectButton onClick={handleLaunchApp}>
          Launch App
        </ConnectButton>
      </MobileMenu>
    </>
  );
};

export default Header; 