import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Contract } from 'ethers';
import { useAccount, usePublicClient, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatEther } from 'viem';

const ReferralContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #4ECDC4;
`;

const ReferralLink = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkText = styled.span`
  color: #4ECDC4;
  word-break: break-all;
`;

const CopyButton = styled.button`
  padding: 0.5rem 1rem;
  background: rgba(78, 205, 196, 0.2);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(78, 205, 196, 0.3);
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
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

const ClaimButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Referral = () => {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const [referralLink, setReferralLink] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [totalRewards, setTotalRewards] = useState('0');

  // Wagmi hooks for contract interaction
  const { data: claimHash, writeContract: claimRewardsContract, isPending: isClaimPending } = useWriteContract();
  const { isLoading: isClaimConfirming, isSuccess: isClaimConfirmed } = useWaitForTransactionReceipt({
    hash: claimHash,
  });

  const fetchReferralStats = useCallback(async () => {
    if (!account || !publicClient) return;

    try {
      // TODO: Replace with actual contract address and ABI
      const idoContract = new Contract(
        'YOUR_IDO_CONTRACT_ADDRESS',
        'YOUR_IDO_CONTRACT_ABI',
        publicClient
      );

      const stats = await idoContract.getReferralStats(account);
      setReferralCount(Number(stats.referralCount));
      setTotalRewards(formatEther(stats.totalRewards));
    } catch (error) {
      console.error('Error fetching referral stats:', error);
    }
  }, [account, publicClient]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  const handleClaimRewards = async () => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    // TODO: Replace with actual contract address and ABI
    try {
      claimRewardsContract({
        address: 'YOUR_IDO_CONTRACT_ADDRESS', // Replace with your IDO contract address
        abi: [ /* YOUR_IDO_CONTRACT_ABI */ ], // Replace with your IDO contract ABI
        functionName: 'claimReferralRewards',
      });
    } catch (error) {
      console.error('Error preparing transaction:', error);
      alert('Error preparing transaction. Please try again.');
    }
  };

  useEffect(() => {
    if (account) {
      // Generate referral link
      const baseUrl = window.location.origin;
      setReferralLink(`${baseUrl}/?ref=${account}`);
      
      // Fetch referral stats
      fetchReferralStats();
    }
  }, [account, fetchReferralStats]);

  useEffect(() => {
    if (isClaimConfirmed) {
      alert('Rewards claimed successfully!');
      fetchReferralStats(); // Refresh stats
    }
    if (isClaimConfirming) {
      console.log("Claim transaction is confirming...");
    }
    if (claimHash && !isClaimConfirming && !isClaimConfirmed) {
      console.log("Claim transaction sent, waiting for confirmation:", claimHash);
    }
  }, [isClaimConfirmed, isClaimConfirming, claimHash, fetchReferralStats]);

  const loading = isClaimPending || isClaimConfirming;

  return (
    <ReferralContainer>
      <Title>Referral Program</Title>
      
      <ReferralLink>
        <LinkText>{referralLink}</LinkText>
        <CopyButton onClick={handleCopyLink}>Copy</CopyButton>
      </ReferralLink>

      <StatsContainer>
        <StatCard>
          <StatValue>{referralCount}</StatValue>
          <StatLabel>Total Referrals</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalRewards}</StatValue>
          <StatLabel>Total Rewards (PAI)</StatLabel>
        </StatCard>
      </StatsContainer>

      <ClaimButton
        onClick={handleClaimRewards}
        disabled={loading || !account || parseFloat(totalRewards) <= 0}
      >
        {loading ? (isClaimConfirming ? 'Confirming...' : 'Processing...') : 'Claim Rewards'}
      </ClaimButton>
    </ReferralContainer>
  );
};

export default Referral; 