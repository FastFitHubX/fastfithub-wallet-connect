# FastFitHub Wallet Connect

A reference implementation demonstrating how to integrate DogeOS wallet connectivity with the FastFitHub ecosystem using the ethers.js library and modern wallet standards.

## Overview

**FastFitHub Wallet Connect** provides a complete, production-ready example of integrating blockchain wallet functionality into a fitness verification application. This project showcases secure wallet connection, balance retrieval, and message signing capabilities for workout verification on the Ethereum network.

## Features

- **Multi-Wallet Support**: Connect using MetaMask or Coinbase Wallet
- **Secure Authentication**: Sign messages to verify identity without exposing private keys
- **Real-Time Balance Updates**: Fetch and display wallet balances in real-time
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Mobile-friendly interface built with React and Tailwind CSS
- **Type-Safe**: Full TypeScript support for robust development

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Blockchain Library**: ethers.js v6
- **Wallet Integration**: wagmi, viem
- **UI Components**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API

## Project Structure

```
fastfithub-wallet-connect/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── WalletConnect.tsx       # Main wallet UI component
│   │   ├── contexts/
│   │   │   └── WalletContext.tsx       # Wallet state management
│   │   ├── pages/
│   │   │   └── Home.tsx                # Landing page with integration guide
│   │   ├── App.tsx                     # Main app component
│   │   ├── main.tsx                    # React entry point
│   │   └── index.css                   # Global styles
│   ├── public/
│   │   └── favicon.ico
│   └── index.html
├── server/
│   └── index.ts                        # Express server for production
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- MetaMask or Coinbase Wallet browser extension
- Basic understanding of Ethereum and Web3 concepts

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/FastFitHubX/fastfithub-wallet-connect.git
   cd fastfithub-wallet-connect
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   pnpm dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000` and connect your wallet

## Usage

### Connecting a Wallet

1. Click "Connect MetaMask" or "Connect Coinbase Wallet"
2. Approve the connection request in your wallet extension
3. Your wallet address and balance will be displayed

### Signing a Message

1. After connecting your wallet, click "Sign 'Verify Workout'"
2. Approve the signature request in your wallet
3. The signature will be displayed and can be copied for verification

### Disconnecting

Click "Disconnect Wallet" to clear the connection and reset the UI

## Integration Guide

### Using the WalletContext Hook

The `useWallet` hook provides access to all wallet functionality:

```typescript
import { useWallet } from '@/contexts/WalletContext';

export function MyComponent() {
  const { address, balance, isConnected, connectWallet, signMessage } = useWallet();

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Address: {address}</p>
          <p>Balance: {balance} ETH</p>
          <button onClick={() => signMessage('Verify Workout')}>
            Sign Message
          </button>
        </div>
      ) : (
        <button onClick={() => connectWallet('metamask')}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
```

### Available Hook Methods

| Method | Description | Returns |
| :--- | :--- | :--- |
| `connectWallet(type)` | Connect to MetaMask or Coinbase Wallet | `Promise<void>` |
| `disconnectWallet()` | Disconnect the current wallet | `void` |
| `signMessage(message)` | Sign a message with the wallet | `Promise<string \| null>` |

### Available Hook State

| Property | Type | Description |
| :--- | :--- | :--- |
| `address` | `string \| null` | Connected wallet address |
| `balance` | `string \| null` | Wallet balance in ETH |
| `isConnected` | `boolean` | Connection status |
| `isConnecting` | `boolean` | Connection in progress |
| `error` | `string \| null` | Error message if any |

## API Reference

### WalletContext

The `WalletContext` provides the following interface:

```typescript
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
```

## Building for Production

```bash
pnpm build
pnpm start
```

The application will be available at `http://localhost:3000`

## Environment Variables

No environment variables are required for basic functionality. The application uses browser-injected wallet providers (MetaMask or Coinbase Wallet).

## Security Considerations

- **Private Keys**: Never stored or transmitted. All signing happens in the wallet extension
- **Message Signing**: Used for verification without requiring transaction signing
- **Network**: Currently configured for Ethereum mainnet. Modify for testnet if needed
- **HTTPS**: Always use HTTPS in production to prevent man-in-the-middle attacks

## Troubleshooting

### Wallet Not Detected

Ensure MetaMask or Coinbase Wallet is installed and enabled in your browser.

### Connection Fails

1. Check that you're on the correct network (Ethereum Mainnet)
2. Try refreshing the page
3. Clear browser cache and cookies
4. Restart your wallet extension

### Balance Not Showing

The application requires network access to fetch balance. Check your internet connection and ensure the RPC endpoint is responsive.

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or issues, please open a GitHub issue or visit the [FastFitHub Community](https://fastfithub.com).

## Related Projects

- [hubx-proof-of-workout](https://github.com/FastFitHubX/hubx-proof-of-workout) - Core PoWk verification backend
- [hubx-sdk](https://github.com/FastFitHubX/hubx-sdk) - Developer SDK for PoWk integration
- [hubx-contracts](https://github.com/FastFitHubX/hubx-contracts) - Smart contracts for HUBX protocol
- [hubx-docs](https://github.com/FastFitHubX/hubx-docs) - Protocol documentation

---

**Sweat. Verify. Earn.** 🏃‍♂️⛓️💰
