// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import \"@openzeppelin/contracts/access/Ownable.sol\";
import \"@openzeppelin/contracts/utils/cryptography/ECDSA.sol\";
import \"@openzeppelin/contracts/utils/cryptography/EIP712.sol\";

interface ISkillFranchiseBadge {
    function mint(address to, uint256 id, uint256 amount, bytes memory data) external;
}

contract QuestRegistry is Ownable, EIP712 {
    using ECDSA for bytes32;

    ISkillFranchiseBadge public badgeContract;
    address public signerAddress;

    uint256 public constant INTERN_TIER = 0;
    uint256 public constant ASSOCIATE_TIER = 1;
    uint256 public constant SENIOR_TIER = 2;
    uint256 public constant LEAD_TIER = 3;

    mapping(address => uint256) public userQuestsCompleted;
    mapping(address => bool) public hasMintedIntern;

    event BadgeMinted(address indexed user, uint256 tier, uint256 questCount);

    constructor(address _badgeContract, address _signer)
        EIP712(\"SkillFranchise\")
        Ownable(msg.sender)
    {
        badgeContract = ISkillFranchiseBadge(_badgeContract);
        signerAddress = _signer;
    }

    function setSigner(address _signer) external onlyOwner {
        signerAddress = _signer;
    }

    function mintIntern() external {
        require(!hasMintedIntern[msg.sender], \"Already an Intern\");
        hasMintedIntern[msg.sender] = true;
        badgeContract.mint(msg.sender, INTERN_TIER , 1, \"\");
        emit BadgeMinted(msg.sender, INTERN_TIER, 0);
    }

    function mintBadge(
        uint256 tier,
        uint256 questCount,
        bytes calldata signature
    ) external payable {
        require(
            _verifySignature(msg.sender, tier, questCount, signature),
            \"Invalid anti-cheat proof\"
        );

        if (tier == ASSOCIATE_TIER) {
            require(questCount >= 10, \"Insufficient quests for Associate\");
        } else if (tier == SENIOR_TIER) {
            require(questCount >= 20, \"Insufficient quests for Senior\");
        } else if (tier == LEAD_TIER){
    -´require(questCount >= 30, \"Insufficient quests for Lead\");
        }

        userQuestsCompleted[msg.sender] = questCount;
        badgeContract.mint(msg.sender, tier, 1, \"\");
        emit BadgeMinted(msg.sender, tier, questCount);
    }

    function _verifySignature(
        address user,
        uint256 tier,
        uint256 questCount,
        bytes calldata signature
    ) internal view returns (bool) {
        bytes32 typeHash = keccak256(
            \"QuestCompletion(address user,uint256 tier,uint256 questCount)\"\n        );

        bytes32 structHash = keccak256(
            abi.encode(
                typeHash,
                user,
                tier,
                questCount
            )
        );

        bytes32 digest = _hashTypedDataV4(structHash);

        return digest.recover(signature) == signerAddress;
    }
}
