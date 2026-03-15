import React, { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Wallet, Copy, LogOut, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const WalletConnect: React.FC = () => {
  const { address, balance, isConnected, isConnecting, error, connectWallet, disconnectWallet, signMessage } = useWallet();
  const [isSigning, setIsSigning] = useState(false);
  const [signatureResult, setSignatureResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSignMessage = async () => {
    setIsSigning(true);
    setSignatureResult(null);
    const signature = await signMessage('Verify Workout');
    if (signature) {
      setSignatureResult(signature);
    }
    setIsSigning(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet Connect
          </CardTitle>
          <CardDescription>Connect your wallet to verify workouts and earn rewards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Connected State */}
          {isConnected && address ? (
            <div className="space-y-4">
              {/* Address Display */}
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Connected Address</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono font-semibold text-lg">{formatAddress(address)}</p>
                  <button
                    onClick={() => copyToClipboard(address)}
                    className="p-2 hover:bg-secondary rounded transition"
                    title="Copy full address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copied && <p className="text-xs text-green-600 mt-1">Copied!</p>}
              </div>

              {/* Balance Display */}
              {balance && (
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Wallet Balance</p>
                  <p className="font-semibold text-lg">{balance} ETH</p>
                </div>
              )}

              {/* Sign Message Button */}
              <Button
                onClick={handleSignMessage}
                disabled={isSigning}
                className="w-full"
                variant="default"
              >
                {isSigning ? 'Signing...' : 'Sign "Verify Workout"'}
              </Button>

              {/* Signature Result */}
              {signatureResult && (
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <p className="font-semibold text-green-700 dark:text-green-300">Message Signed Successfully</p>
                  </div>
                  <p className="text-xs font-mono break-all text-green-700 dark:text-green-300 bg-white dark:bg-green-900 p-2 rounded">
                    {signatureResult.substring(0, 50)}...
                  </p>
                  <button
                    onClick={() => copyToClipboard(signatureResult)}
                    className="text-xs text-green-600 hover:text-green-700 mt-2 underline"
                  >
                    Copy Signature
                  </button>
                </div>
              )}

              {/* Disconnect Button */}
              <Button
                onClick={disconnectWallet}
                variant="outline"
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect Wallet
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* MetaMask Button */}
              <Button
                onClick={() => connectWallet('metamask')}
                disabled={isConnecting}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
              </Button>

              {/* Coinbase Button */}
              <Button
                onClick={() => connectWallet('coinbase')}
                disabled={isConnecting}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isConnecting ? 'Connecting...' : 'Connect Coinbase Wallet'}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Make sure you have MetaMask or Coinbase Wallet installed
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Integration Info */}
      <Card className="mt-4 border-primary/10">
        <CardHeader>
          <CardTitle className="text-base">Integration Info</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            This reference implementation demonstrates how to integrate wallet connectivity with FastFitHub using:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>ethers.js for blockchain interactions</li>
            <li>MetaMask and Coinbase Wallet support</li>
            <li>Message signing for workout verification</li>
            <li>Real-time balance updates</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
