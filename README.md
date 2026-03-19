# SkillFranchise: Decentralized Upskilling & Recruitment Platform

SkillFranchise is a blockchain-native credentialing engine designed to facilitate verifiable career pathways through tiered quests, on-chain badges (ERC-1155), and an EIP-712 based "Anti-Cheat" attestation system.

## 🚀 Core Vision
To provide a decentralized, auditable, and portable credentialing system where users earn tiered badges (Beginner, Intermediate, Advanced) that unlock verifiable "Job Eligibility" flags for recruitment.

## 🛠 Tech Stack (v1.1 Monorepo)
- **Monorepo Manager:** `pnpm` + `Turborepo`
- **Smart Contracts:** `Solidity` + `Hardhat` (Target: Base/EVM)
- **Frontend:** `Next.js 14`, `Tailwind CSS`, `RainbowKit`, `Wagmi`
- **Backend:** `Node.js`, `TypeScript`, `Express`, `Ethers.js` (EIP-712 Signing)
- **Storage:** `IPFS` / `Arweave` (Off-chain metadata via canonical hashes)
- **Oracle:** `Chainlink ETH/USD` (Native token pricing for mints)

## 🏗 System Architecture
SkillFranchise uses a hybrid architecture to balance gas efficiency with technical integrity:
1. **On-Chain (ERC-1155):** Manages badge ownership, tier counts, referral discounts, and the `isJobEligible` status flag.
2. **Off-Chain (IPFS):** Stores rich quest metadata and write-ups (>700 words) to minimize on-chain state costs.
3. **Attestation Service:** A backend signer that validates quest completions and issues EIP-712 signatures required for minting.

## 🛡 Security & Anti-Cheat
- **EIP-712 Typed Signatures:** Prevents replay attacks and unauthorized minting.
- **Progression Gating:**
  - 30 Beginner -> Intermediate
  - 20 Intermediate -> Advanced
  - 10 Advanced -> Job Eligible
- **Referral Logic:** 10% discount for referrers once their referee hits a 20-badge milestone.

## 📁 Repository Structure
```text
.
├── apps
│   ├── contracts/          # Hardhat project (Solidity)
│   ├── frontend/           # Next.js User Dashboard
│   └── backend/            # Node.js Attestation Service
├── packages
│   └── shared/             # EIP-712 Types, ABIs, and Constants
└── README.md
```

## 📋 Status & Roadmap
- [x] v1.0: Technical Architecture Spec
- [x] v1.1: Monorepo Structure Draft
- [x] v1.2: Frontend Dashboard & Backend Attestation Draft
- [ ] v1.3: Repository Initialization (Awaiting GitHub PAT)
- [ ] v1.4: Smart Contract Deployment & Integration

## 💳 Deployment Info
- **Deployment Wallet (Base):** `0xD043625BFFCD7a93F2e8189C1b6e8f91752D32eA`
- **GitHub Target:** [Cadarn97/Builden-SkillFranchise-](https://github.com/Cadarn97/Builden-SkillFranchise-)

**Ship the spec, then iterate.**
