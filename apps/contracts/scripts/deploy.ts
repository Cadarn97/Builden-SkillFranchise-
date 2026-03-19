import { ethers } from "hardhat";

async function main() {
  const [deployer, questSigner] = await ethers.getSigners();

  console.log("Deploying contracts with:");
  console.log("  Deployer:", await deployer.getAddress());
  console.log("  Quest signer (EIP-712 signer):", await questSigner.getAddress());

  const BadgeFactory = await ethers.getContractFactory("SkillFranchiseBadge");
  const badge = await BadgeFactory.connect(deployer).deploy();
  await badge.waitForDeployment();

  const badgeAddress = await badge.getAddress();
  console.log("SkillFranchiseBadge deployed to:", badgeAddress);

  const RegistryFactory = await ethers.getContractFactory("QuestRegistry");
  const registry = await RegistryFactory.connect(deployer).deploy(
    badgeAddress,
    await questSigner.getAddress()
  );
  await registry.waitForDeployment();

  const registryAddress = await registry.getAddress();
  console.log("QuestRegistry deployed to:", registryAddress);

  if ((badge as any).setRegistry) {
    const tx = await (badge as any).connect(deployer).setRegistry(registryAddress);
    await tx.wait();
    console.log("Registry configured as authorized minter on SkillFranchiseBadge");
  }

  console.log("Deployment complete.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
