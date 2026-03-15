import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  address: string | null;
  balance: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connectWallet: (walletType: 'metamask' | 'coinbase') => Promise<void>;
  disconnectWallet: () => void;
  signMessage: (message: string) => Promise<string | null>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  // Fetch wallet balance
  const fetchBalance = useCallback(async (addr: string, prov: ethers.BrowserProvider) => {
    try {
      const balanceWei = await prov.getBalance(addr);
      const balanceEth = ethers.formatEther(balanceWei);
      setBalance(parseFloat(balanceEth).toFixed(4));
    } catch (err) {
      console.error('Error fetching balance:', err);
      setBalance(null);
    }
  }, []);

  // Connect MetaMask wallet
  const connectMetaMask = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install it to continue.');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const selectedAddress = accounts[0];
      const prov = new ethers.BrowserProvider(window.ethereum);

      setAddress(selectedAddress);
      setProvider(prov);
      setIsConnected(true);

      // Fetch balance
      await fetchBalance(selectedAddress, prov);

      // Listen for account changes
      window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
        if (newAccounts.length === 0) {
          disconnectWallet();
        } else {
          setAddress(newAccounts[0]);
          fetchBalance(newAccounts[0], prov);
        }
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect MetaMask';
      setError(errorMessage);
      console.error('MetaMask connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  }, [fetchBalance]);

  // Connect Coinbase Wallet
  const connectCoinbase = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);

      if (!window.coinbaseWalletProvider) {
        throw new Error('Coinbase Wallet is not installed. Please install it to continue.');
      }

      const accounts = await window.coinbaseWalletProvider.request({
        method: 'eth_requestAccounts',
      });

      const selectedAddress = accounts[0];
      const prov = new ethers.BrowserProvider(window.coinbaseWalletProvider);

      setAddress(selectedAddress);
      setProvider(prov);
      setIsConnected(true);

      // Fetch balance
      await fetchBalance(selectedAddress, prov);

      // Listen for account changes
      window.coinbaseWalletProvider.on('accountsChanged', (newAccounts: string[]) => {
        if (newAccounts.length === 0) {
          disconnectWallet();
        } else {
          setAddress(newAccounts[0]);
          fetchBalance(newAccounts[0], prov);
        }
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect Coinbase Wallet';
      setError(errorMessage);
      console.error('Coinbase Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  }, [fetchBalance]);

  // Connect wallet based on type
  const connectWallet = useCallback(async (walletType: 'metamask' | 'coinbase') => {
    if (walletType === 'metamask') {
      await connectMetaMask();
    } else if (walletType === 'coinbase') {
      await connectCoinbase();
    }
  }, [connectMetaMask, connectCoinbase]);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setAddress(null);
    setBalance(null);
    setIsConnected(false);
    setProvider(null);
    setError(null);
  }, []);

  // Sign message
  const signMessage = useCallback(async (message: string): Promise<string | null> => {
    if (!provider || !address) {
      setError('Wallet not connected');
      return null;
    }

    try {
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);
      return signature;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign message';
      setError(errorMessage);
      console.error('Message signing error:', err);
      return null;
    }
  }, [provider, address]);

  const value: WalletContextType = {
    address,
    balance,
    isConnected,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    signMessage,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

// Type declarations for window objects
declare global {
  interface Window {
    ethereum?: any;
    coinbaseWalletProvider?: any;
  }
}
