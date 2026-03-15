import { WalletConnect } from "@/components/WalletConnect";

/**
 * FastFitHub Wallet Connect - Reference Implementation
 * 
 * This page demonstrates how to integrate DogeOS wallet connectivity
 * using ethers.js with support for MetaMask and Coinbase Wallet.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b border-primary/10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">FH</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">FastFitHub</h1>
                <p className="text-xs text-muted-foreground">Wallet Connect Reference</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Connect Your Wallet
            </h2>
            <p className="text-lg text-muted-foreground">
              Integrate with FastFitHub to verify your workouts and earn rewards on the blockchain
            </p>
          </div>

          {/* Wallet Connect Component */}
          <div className="flex justify-center">
            <WalletConnect />
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-primary/10">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Secure Connection</h3>
              <p className="text-sm text-muted-foreground">
                Connect securely using MetaMask or Coinbase Wallet with industry-standard protocols
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-primary/10">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Sign Messages</h3>
              <p className="text-sm text-muted-foreground">
                Verify your identity by signing messages without exposing your private keys
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-primary/10">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Get rewarded with HUBX tokens, BTC, and DOGE for verified physical activities
              </p>
            </div>
          </div>

          {/* Integration Guide */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg border border-primary/10">
            <h3 className="text-2xl font-bold text-foreground mb-4">Integration Guide</h3>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">1. Install Dependencies</h4>
                <code className="bg-slate-100 dark:bg-slate-900 p-2 rounded text-sm block">
                  npm install ethers wagmi viem
                </code>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">2. Wrap Your App with WalletProvider</h4>
                <code className="bg-slate-100 dark:bg-slate-900 p-2 rounded text-sm block">
                  &lt;WalletProvider&gt;&lt;YourApp /&gt;&lt;/WalletProvider&gt;
                </code>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">3. Use the useWallet Hook</h4>
                <code className="bg-slate-100 dark:bg-slate-900 p-2 rounded text-sm block">
                  const {'{address, balance, connectWallet}'} = useWallet();
                </code>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">4. Sign Messages for Verification</h4>
                <code className="bg-slate-100 dark:bg-slate-900 p-2 rounded text-sm block">
                  const signature = await signMessage('Verify Workout');
                </code>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground border-t border-primary/10 pt-8">
            <p>
              FastFitHub Wallet Connect • Reference Implementation for DogeOS Integration
            </p>
            <p className="mt-2">
              <a href="https://github.com/FastFitHubX/fastfithub-wallet-connect" className="text-primary hover:underline">
                View on GitHub
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
