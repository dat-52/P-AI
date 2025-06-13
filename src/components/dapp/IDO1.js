import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Contract } from 'ethers';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

const IDOContainer = styled.div`
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

const TokenInfo = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const BuyButton = styled.button`
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

const IDO = () => {
  const { address: account } = useAccount();
  const [bnbAmount, setBnbAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('0');
  
  // Wagmi hooks for contract interaction
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Mock token price (replace with actual price from contract)
  const tokenPrice = 0.0001; // BNB per token

  const handleBnbChange = (e) => {
    const value = e.target.value;
    setBnbAmount(value);
    // Calculate token amount based on BNB input
    const tokens = value ? (parseFloat(value) / tokenPrice).toFixed(2) : '0';
    setTokenAmount(tokens);
  };

  const handleBuy = async () => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    if (!bnbAmount || parseFloat(bnbAmount) <= 0) {
      alert('Please enter a valid BNB amount');
      return;
    }

    // TODO: Replace with actual contract address and ABI
    // Example of how to call writeContract. You will need to define the ABI and contract address.
    try {
      writeContract({
        address: 'YOUR_IDO_CONTRACT_ADDRESS', // Replace with your IDO contract address
        abi: [ /* YOUR_IDO_CONTRACT_ABI */ ], // Replace with your IDO contract ABI
        functionName: 'buyTokens',
        value: parseEther(bnbAmount),
      });
    } catch (error) {
      console.error('Error preparing transaction:', error);
      alert('Error preparing transaction. Please try again.');
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      alert('Purchase successful!');
      setBnbAmount('');
      setTokenAmount('0');
    }
    if (isConfirming) {
      console.log("Transaction is confirming...");
    }
    if (hash && !isConfirming && !isConfirmed) {
      console.log("Transaction sent, waiting for confirmation:", hash);
    }
  }, [isConfirmed, isConfirming, hash]);

  const loading = isPending || isConfirming;

  return (
    <IDOContainer>
      <Title>Buy $PAI Tokens</Title>
      <InputGroup>
        <Label>Amount in BNB</Label>
        <Input
          type="number"
          value={bnbAmount}
          onChange={handleBnbChange}
          placeholder="Enter BNB amount"
          min="0"
          step="0.01"
        />
      </InputGroup>

      <TokenInfo>
        <Label>You will receive:</Label>
        <div>{tokenAmount} $PAI tokens</div>
      </TokenInfo>

      <BuyButton
        onClick={handleBuy}
        disabled={loading || !bnbAmount || !account}
      >
        {loading ? (isConfirming ? 'Confirming...' : 'Processing...') : 'Buy Tokens'}
      </BuyButton>
    </IDOContainer>
  );
};

export default IDO; 