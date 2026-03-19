export type Eip712Domain = {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
};

export type SkillAttestationMessage = {
  user: string;
  skillId: string;
  level: number; // uint8
  nonce: bigint | number | string; // uint256
  issuedAt: bigint | number | string; // uint256 (unix seconds)
};

export const EIP712_DOMAIN_TYPE = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' }
] as const;

export const SKILL_ATTESTATION_TYPE = [
  { name: 'user', type: 'address' },
  { name: 'skillId', type: 'string' },
  { name: 'level', type: 'uint8' },
  { name: 'nonce', type: 'uint256' },
  { name: 'issuedAt', type: 'uint256' }
] as const;

/**
 * Types object to pass into `ethers.verifyTypedData(domain, types, value, signature)`.
 * Note: ethers expects `types` to exclude EIP712Domain.
 */
export const SkillAttestationTypes = {
  SkillAttestation: SKILL_ATTESTATION_TYPE
} as const;
