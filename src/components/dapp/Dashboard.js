import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Contract } from 'ethers';
import { useAccount, usePublicClient } from 'wagmi';
import { formatEther } from 'viem';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #4ECDC4;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  color: #4ECDC4;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #888;
`;

const HistorySection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #4ECDC4;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HistoryItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HistoryInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const HistoryType = styled.span`
  color: #fff;
  font-weight: bold;
`;

const HistoryDate = styled.span`
  color: #888;
  font-size: 0.9rem;
`;

const HistoryAmount = styled.span`
  color: #4ECDC4;
  font-weight: bold;
`;

const Dashboard = () => {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const [totalTokens, setTotalTokens] = useState('0');
  const [stakedTokens, setStakedTokens] = useState('0');
  const [referralRewards, setReferralRewards] = useState('0');
  const [stakingRewards, setStakingRewards] = useState('0');
  const [history, setHistory] = useState([]);

  const fetchDashboardData = useCallback(async () => {
    if (!account || !publicClient) return;

    try {
      // TODO: Replace with actual contract addresses and ABIs
      const tokenContract = new Contract(
        '0x8f518f33ab7b97c57dd28c4614925684bf6bc048',
        'YOUR_TOKEN_CONTRACT_ABI',
        publicClient
      );
      const stakingContract = new Contract(
        'YOUR_STAKING_CONTRACT_ADDRESS',
        'YOUR_STAKING_CONTRACT_ABI',
        publicClient
      );
      const idoContract = new Contract(
        'YOUR_IDO_CONTRACT_ADDRESS',
        'YOUR_IDO_CONTRACT_ABI',
        publicClient
      );

      // Fetch token balance
      const balance = await tokenContract.balanceOf(account);
      setTotalTokens(formatEther(balance));

      // Fetch staked amount
      const staked = await stakingContract.getStakedAmount(account);
      setStakedTokens(formatEther(staked));

      // Fetch referral rewards
      const refStats = await idoContract.getReferralStats(account);
      setReferralRewards(formatEther(refStats.totalRewards));

      // Fetch staking rewards
      const stakingRewards = await stakingContract.getPendingRewards(account);
      setStakingRewards(formatEther(stakingRewards));

      // TODO: Implement history fetching
      // This is a mock history for now
      setHistory([
        {
          type: 'Stake',
          amount: '1000 PAI',
          date: '2024-03-15 14:30',
        },
        {
          type: 'Referral Reward',
          amount: '50 PAI',
          date: '2024-03-14 09:15',
        },
        {
          type: 'IDO Purchase',
          amount: '5000 PAI',
          date: '2024-03-13 16:45',
        },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }, [account, publicClient]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  return (
    <DashboardContainer>
      <Title>Dashboard</Title>

      <StatsGrid>
        <StatCard>
          <StatValue>{totalTokens}</StatValue>
          <StatLabel>Total PAI Tokens</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stakedTokens}</StatValue>
          <StatLabel>Staked Tokens</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{referralRewards}</StatValue>
          <StatLabel>Referral Rewards</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stakingRewards}</StatValue>
          <StatLabel>Staking Rewards</StatLabel>
        </StatCard>
      </StatsGrid>

      <HistorySection>
        <SectionTitle>Transaction History</SectionTitle>
        <HistoryList>
          {history.map((item, index) => (
            <HistoryItem key={index}>
              <HistoryInfo>
                <HistoryType>{item.type}</HistoryType>
                <HistoryDate>{item.date}</HistoryDate>
              </HistoryInfo>
              <HistoryAmount>{item.amount}</HistoryAmount>
            </HistoryItem>
          ))}
        </HistoryList>
      </HistorySection>
    </DashboardContainer>
  );
};

export default Dashboard; 