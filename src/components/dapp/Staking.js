import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Contract } from 'ethers';
import { useAccount, usePublicClient, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';

const StakingContainer = styled.div`
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

const StakingForm = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4ECDC4;
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 1rem;
  background: ${props => props.primary ? 'linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%)' : 'rgba(255, 255, 255, 0.1)'};
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

const ClaimButton = styled.button`
  padding: 1rem;
  background: ${props => props.primary ? 'linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%)' : 'rgba(255, 255, 255, 0.1)'};
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

const Staking = () => {
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const [stakedAmount, setStakedAmount] = useState('0');
  const [rewards, setRewards] = useState('0');
  const [stakeAmount, setStakeAmount] = useState('');
  
  // Wagmi hooks for contract interactions
  const { data: stakeHash, writeContract: stakeTokens, isPending: isStakePending } = useWriteContract();
  const { isLoading: isStakeConfirming, isSuccess: isStakeConfirmed } = useWaitForTransactionReceipt({
    hash: stakeHash,
  });

  const { data: unstakeHash, writeContract: unstakeTokens, isPending: isUnstakePending } = useWriteContract();
  const { isLoading: isUnstakeConfirming, isSuccess: isUnstakeConfirmed } = useWaitForTransactionReceipt({
    hash: unstakeHash,
  });

  const { data: claimHash, writeContract: claimRewardsContract, isPending: isClaimPending } = useWriteContract();
  const { isLoading: isClaimConfirming, isSuccess: isClaimConfirmed } = useWaitForTransactionReceipt({
    hash: claimHash,
  });

  const fetchStakingInfo = useCallback(async () => {
    if (!account || !publicClient) return;

    try {
      // TODO: Replace with actual contract address and ABI
      const stakingContract = new Contract(
        'YOUR_STAKING_CONTRACT_ADDRESS',
        'YOUR_STAKING_CONTRACT_ABI',
        publicClient
      );

      const staked = await stakingContract.getStakedAmount(account);
      const pendingRewards = await stakingContract.getPendingRewards(account);

      setStakedAmount(formatEther(staked));
      setRewards(formatEther(pendingRewards));
    } catch (error) {
      console.error('Error fetching staking info:', error);
    }
  }, [account, publicClient]);

  const handleStake = async () => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // TODO: Replace with actual contract address and ABI
    try {
      stakeTokens({
        address: 'YOUR_STAKING_CONTRACT_ADDRESS', // Replace with your staking contract address
        abi: [ /* YOUR_STAKING_CONTRACT_ABI */ ], // Replace with your staking contract ABI
        functionName: 'stake',
        args: [parseEther(stakeAmount)],
      });
    } catch (error) {
      console.error('Error preparing stake transaction:', error);
      alert('Error preparing stake transaction. Please try again.');
    }
  };

  const handleUnstake = async () => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    // TODO: Replace with actual contract address and ABI
    try {
      unstakeTokens({
        address: 'YOUR_STAKING_CONTRACT_ADDRESS', // Replace with your staking contract address
        abi: [ /* YOUR_STAKING_CONTRACT_ABI */ ], // Replace with your staking contract ABI
        functionName: 'unstake',
      });
    } catch (error) {
      console.error('Error preparing unstake transaction:', error);
      alert('Error preparing unstake transaction. Please try again.');
    }
  };

  const handleClaimRewards = async () => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    // TODO: Replace with actual contract address and ABI
    try {
      claimRewardsContract({
        address: 'YOUR_STAKING_CONTRACT_ADDRESS', // Replace with your staking contract address
        abi: [ /* YOUR_STAKING_CONTRACT_ABI */ ], // Replace with your staking contract ABI
        functionName: 'claimRewards',
      });
    } catch (error) {
      console.error('Error preparing claim rewards transaction:', error);
      alert('Error preparing claim rewards transaction. Please try again.');
    }
  };

  useEffect(() => {
    fetchStakingInfo();
  }, [fetchStakingInfo]);

  useEffect(() => {
    if (isStakeConfirmed) {
      alert('Staked successfully!');
      setStakeAmount('');
      fetchStakingInfo();
    }
    if (isStakeConfirming) {
      console.log("Stake transaction is confirming...");
    }
    if (stakeHash && !isStakeConfirming && !isStakeConfirmed) {
      console.log("Stake transaction sent, waiting for confirmation:", stakeHash);
    }
  }, [isStakeConfirmed, isStakeConfirming, stakeHash, fetchStakingInfo]);

  useEffect(() => {
    if (isUnstakeConfirmed) {
      alert('Unstaked successfully!');
      fetchStakingInfo();
    }
    if (isUnstakeConfirming) {
      console.log("Unstake transaction is confirming...");
    }
    if (unstakeHash && !isUnstakeConfirming && !isUnstakeConfirmed) {
      console.log("Unstake transaction sent, waiting for confirmation:", unstakeHash);
    }
  }, [isUnstakeConfirmed, isUnstakeConfirming, unstakeHash, fetchStakingInfo]);

  useEffect(() => {
    if (isClaimConfirmed) {
      alert('Rewards claimed successfully!');
      fetchStakingInfo();
    }
    if (isClaimConfirming) {
      console.log("Claim rewards transaction is confirming...");
    }
    if (claimHash && !isClaimConfirming && !isClaimConfirmed) {
      console.log("Claim rewards transaction sent, waiting for confirmation:", claimHash);
    }
  }, [isClaimConfirmed, isClaimConfirming, claimHash, fetchStakingInfo]);

  const loading = isStakePending || isStakeConfirming || isUnstakePending || isUnstakeConfirming || isClaimPending || isClaimConfirming;

  return (
    <StakingContainer>
      <Title>Staking</Title>

      <StatsContainer>
        <StatCard>
          <StatValue>{stakedAmount}</StatValue>
          <StatLabel>Staked Amount (PAI)</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{rewards}</StatValue>
          <StatLabel>Pending Rewards (PAI)</StatLabel>
        </StatCard>
      </StatsContainer>

      <StakingForm>
        <SectionTitle>Stake Tokens</SectionTitle>
        <InputGroup>
          <Label>Amount to Stake</Label>
          <Input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />
        </InputGroup>
        <ButtonGroup>
          <Button
            primary
            onClick={handleStake}
            disabled={loading || !stakeAmount || parseFloat(stakeAmount) <= 0 || !account}
          >
            {isStakePending ? 'Preparing...' : isStakeConfirming ? 'Confirming...' : 'Stake'}
          </Button>
          <Button
            onClick={handleUnstake}
            disabled={loading || parseFloat(stakedAmount) <= 0 || !account}
          >
            {isUnstakePending ? 'Preparing...' : isUnstakeConfirming ? 'Confirming...' : 'Unstake All'}
          </Button>
        </ButtonGroup>
      </StakingForm>

      <ClaimButton
        onClick={handleClaimRewards}
        disabled={loading || parseFloat(rewards) <= 0 || !account}
      >
        {isClaimPending ? 'Preparing...' : isClaimConfirming ? 'Confirming...' : 'Claim Rewards'}
      </ClaimButton>
    </StakingContainer>
  );
};

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #4ECDC4;
`;

export default Staking; 