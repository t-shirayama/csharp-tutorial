# Security Policy

## Supported Scope

This repository is a Markdown knowledge base and MkDocs site. Security checks focus on documentation supply chain, GitHub Actions, Docker build inputs, and accidental secret exposure.

## Reporting a Vulnerability

Please report security concerns privately by using GitHub's private vulnerability reporting if it is available for this repository, or by contacting the repository owner directly.

Do not disclose suspected secrets, tokens, or exploitable workflow details in public issues or pull requests.

## CI Security Controls

- Dependabot monitors GitHub Actions, Python dependencies, Docker, and Docker Compose.
- Dependency Review blocks pull requests that introduce moderate or higher vulnerable dependencies.
- CodeQL scans GitHub Actions workflow definitions.
- Gitleaks scans the repository history and pull requests for leaked secrets.
- actionlint and zizmor inspect GitHub Actions workflow syntax and security patterns.
- Hadolint checks the Dockerfile for container build best practices.
- OpenSSF Scorecard reports repository supply-chain posture to GitHub code scanning.
- Workflows use least-privilege `GITHUB_TOKEN` permissions where possible.
- Checkout steps disable credential persistence unless a job explicitly needs push access.
