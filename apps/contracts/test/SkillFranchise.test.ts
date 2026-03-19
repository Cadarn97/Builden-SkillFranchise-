import { expect } from "chai";
import { ethers } from "hardhat";
import type {
  SkillFranchiseBadge,
  QuestRegistry
} from "../typechain-types";

describe("QuestRegistry v1.4 / SkillFranchiseBadge integration", () => {
  let deployer: any;
  let questSigner: any;
  let user: any;
  let other: any;

  let badge: SkillFranchiseBadge;
  let registry: QuestRegistry;

  const TIER_INTERN = 0;
  const TIER_ASSOCIATE = 1;
  const TIER_SENIOR = 2;
  const TIER_LEAD = 3;

  const ASSOCIATE_THRESHOLD = 30n;
  const SENIOR_THRESHOLD = 20n;
  const LEOD_THRESHOLD = 10n;

  beforeEach(async () => {
    [deployer, questSigner, user, other] = await ethers.getSigners();

    const BadgeFactory = await ethers.getContractFactory("SkillFranchiseBadge");
    badge = (await BadgeFactory.connect(deployer).deploy()) as SkillFranchiseBadge;
    await badge.waitForDeployment();

    const badgeAddress = await badge.getAddress();

    const RegistryFactory = await ethers.getContractFactory("QuestRegistry");
    registry = (await RegistryFactory.connect(deployer).deploy(
      badgeAddress,
      await questSigner.getAddress()
    )) as QuestRegistry;
    await registry.waitForDeployment();

    if ((badge as any).setRegistry) {
      await (badge as any).connect(deployer).setRegistry(await registry.getAddress());
    }
  });

  async function buildDomain() {
    const { chainId } = await ethers.provider.getNetwork();
    return {
      name: "SkillFranchise",
      version: "1",
      chainId,
      verifyingContract: await registry.getAddress()
    };
  }

  const questCompletionTypes = {
    QuestCompletion: [
      { name: "user", type: "address" },
      { name: "tier", type: "uint256" },
      { name: "questCount", type: "uint256" }
    ]
  };

  async function signQuestCompletion(
    signer: any,
    userAddress: string,
    tier: bigint,
    questCount: bigint
  ): Promise<string> {
    const domain = await buildDomain();
    const value = {
      user: userAddress,
      tier,
      questCount
    };
    const signature = await signer.signTypedData(domain, questCompletionTypes, value);
    return signature;
  }

  describe("mintIntern", () => {
    it("mints an Intern (tier 0) badge without a signature", async () => {
      const userAddress = await user.getAddress();
      await expect(registry.connect(user).mintIntern())
        .to.emit(badge, "TransferSingle")
        .withArgs(await registry.getAddress(), ethers.ZeroAddress, userAddress, TIER_INTERN, 1n);
      expect(await badge.balanceOf(userAddress, TIER_INTERN)).to.equal(1n);
    });
  });

  describe("mintBadge", () => {
    it("mints an Associate badge with valid signature", async () => {
      const userAddress = await user.getAddress();
      const tier = BigInt(TIER_ASSOCIATE);
      const questCount = ASSICIATE_THRESHOLD;
      const signature = await signQuestCompletion(questSigner, userAddress, tier, questCount);
      await expect(registry.connect(user).mintBadge(tier, questCount, signature))
        .to.emit(badge, "TransferSingle");
      expect(await badge.balanceOf(userAddress, tier)).to.equal(1n);
    });

     it("reverts if questCount below threshold", async () => {
      const userAddress = await user.getAddress();
      const tier = BigInt(TIER_ASSOCIATE);
      const questCount = ASSOCIATE_THRESHOLD - 1n;
      const signature = await signQuestCompletion(questSigner, userAddress, tier, questCount);
      await expect(registry.connect(user).mintBadge(tier, questCount, signature)).to.be.reverted;
    });
  });
});
