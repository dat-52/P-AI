import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import IDO from './IDO1.js';
import Referral from './Referral';
import Staking from './Staking';
import Dashboard from './Dashboard';
import { AppKitProvider } from "./AppKitProvider.jsx";
import { useAccount, useConnect } from 'wagmi';
import { injected } from '@wagmi/connectors';

const DAppContainer = styled.div`
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4ECDC4;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(78, 205, 196, 0.1);
  }

  &.active {
    background: rgba(78, 205, 196, 0.2);
  }
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ConnectButton = styled.button`
  padding: 0.8rem 1.5rem;
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

const DApp = () => {
  const { address: account } = useAccount();
  const { connect } = useConnect();
  const navigate = useNavigate();

  const handleConnectWallet = () => {
    connect({ connector: injected() });
  };

  return (
    <AppKitProvider>
      <DAppContainer>
        <Header>
          <Logo>PI.AI DApp</Logo>
          <Nav>
            <NavLink to="/dapp/ido">IDO</NavLink>
            <NavLink to="/dapp/referral">Referral</NavLink>
            <NavLink to="/dapp/staking">Staking</NavLink>
            <NavLink to="/dapp/dashboard">Dashboard</NavLink>
          </Nav>
          <WalletInfo>
            {account ? (
              <span>{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
            ) : (
              <ConnectButton onClick={handleConnectWallet}>Connect Wallet</ConnectButton>
            )}
          </WalletInfo>
        </Header>

        <Routes>
          <Route path="ido" element={<IDO account={account} />} />
          <Route path="referral" element={<Referral account={account} />} />
          <Route path="staking" element={<Staking account={account} />} />
          <Route path="dashboard" element={<Dashboard account={account} />} />
          <Route path="*" element={<IDO account={account} />} />
        </Routes>
      </DAppContainer>
    </AppKitProvider>
  );
};

export default DApp; 