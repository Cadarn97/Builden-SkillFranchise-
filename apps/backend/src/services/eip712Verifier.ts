import { ethers } from 'ethers';

// EIP-712 Domain (Shared with Contract)
const DOMAIN = {
  name: "SkillFranchise",
  version: "1",
  chainId: 137, // Polygon/Base/etc
  verifyingContract: "0x..." 
};

// EIP-712 Types
const TYPES = {
  BadgeMint: [
    { name: "user", type: "address" },
    { name: "badgeId", type: "uint256" },
    { name: "questId", type: "string" },
    { name: "nonce", type: "uint256" }
  ]
};

const signerWallet = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY);

export async function generateMintSignature(user: string, badgeId: number, questId: string) {
  // Logic to verify quest completion without backtracking would happen here
  // e.g., check database for session logs or violation flags.

  const nonce = await fetchNextNonceFromRegistry(user);

  const value = {
    user: user,
    badgeId: badgeId,
    questId: questId,
    nonce: nonce
  };

  const signature = await signerWallet._signTypedData(DOMAIN, TYPES, value);
  return { signature, value };
}
