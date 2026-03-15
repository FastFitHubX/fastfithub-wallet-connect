# Contributing to FastFitHub Wallet Connect

Thank you for your interest in contributing to FastFitHub Wallet Connect! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/FastFitHubX/fastfithub-wallet-connect.git
   cd fastfithub-wallet-connect
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start development server**:
   ```bash
   pnpm dev
   ```

## Coding Standards

- **Language**: TypeScript for all new code
- **Formatting**: Use Prettier for code formatting
- **Linting**: Follow ESLint rules
- **Components**: Use React functional components with hooks
- **Styling**: Use Tailwind CSS and shadcn/ui components

### Code Style

```typescript
// ✅ Good: Clear, typed, and well-documented
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

// ❌ Bad: Unclear, missing types, no error handling
const useWallet = () => useContext(WalletContext);
```

## Pull Request Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test thoroughly

3. **Commit with clear messages**:
   ```bash
   git commit -m "Add feature: description of changes"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** with a clear description of changes

## Commit Message Format

Use clear, descriptive commit messages:

```
feat: Add wallet balance refresh functionality
fix: Resolve MetaMask connection timeout issue
docs: Update README with new API examples
test: Add unit tests for WalletContext
chore: Update dependencies
```

## Issue Reporting

When reporting issues, please include:

- Clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser and wallet extension versions
- Screenshots or error messages

## Testing

- Test your changes locally before submitting a PR
- Ensure the development server starts without errors
- Test wallet connections with both MetaMask and Coinbase Wallet
- Verify responsive design on mobile devices

## Documentation

- Update README.md if adding new features
- Add inline comments for complex logic
- Include TypeScript types for all functions
- Update this CONTRIBUTING.md if adding new processes

## Code Review Process

All submissions require review. Reviewers will check for:

- Code quality and adherence to standards
- Proper error handling
- Security considerations
- Documentation completeness
- Test coverage

## Questions?

- Open a GitHub Discussion
- Check existing Issues and PRs
- Contact the maintainers

Thank you for contributing to FastFitHub Wallet Connect!
