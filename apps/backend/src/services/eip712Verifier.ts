import { getAddress, verifyTypedData } from 'ethers';

import type {
  Eip712Domain,
  SkillAttestationMessage
} from '@skillfranchise/shared/eip712/types';
import { SkillAttestationTypes } from '@skillfranchise/shared/eip712/types';

export type VerifySkillAttestationParams = {
  expectedSigner: string;
  domain: Eip712Domain;
  message: SkillAttestationMessage;
  signature: string;
};

/**
 * Verifies an EIP-712 signature for a SkillAttestation payload.
 *
 * Returns the recovered signer address (checksummed) if valid,
 * otherwise throws.
 */
export function verifySkillAttestationSignature({
  expectedSigner,
  domain,
  message,
  signature
}: VerifySkillAttestationParams): string {
  const recovered = verifyTypedData(domain, SkillAttestationTypes, message, signature);
  const recoveredChecksum = getAddress(recovered);
  const expectedChecksum = getAddress(expectedSigner);

  if (recoveredChecksum !== expectedChecksum) {
    throw new Error(
      `Invalid signature: expected ${expectedChecksum}, recovered ${recoveredChecksum}`
    );
  }

  return recoveredChecksum;
}
