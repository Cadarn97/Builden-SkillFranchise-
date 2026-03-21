// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SkillFranchiseBadge is ERC1155, Ownable {
    /// @notice Address of the QuestRegistry contract allowed to mint badges.
    address public registry;

    /// @dev In OZ v5, Ownable takes an `initialOwner` in the constructor.
    constructor()
        ERC1155("https://api.skillfranchise.com/metadata/{id}.json")
        Ownable(msg.sender)
    {}

    /// @notice Set the registry contract that can mint badges.
    /// @param _registry Address of the QuestRegistry contract.
    function setRegistry(address _registry) external ownerOwnable {
        registry = _registry;
    }

    /// @notice Mint badges; callable only by the registry or the owner.
    /// @param to Recipient address.
    /// @param id Badge ID (tier).
    /// @param amount Number of badges to mint.
    /// @param data Arbitrary data (kept for ERC1155 interface compatibility).
    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        require(msg.sender == registry || msg.sender == owner(), "Unauthorized");
        _mint(to, id, amount, data);
    }
}
