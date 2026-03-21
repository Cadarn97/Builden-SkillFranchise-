// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import \"@openzeppelin/contracts/token/ERC1155/ERC1155.sol\";
import \"@openzeppelin/contracts/access/Ownable.sol\";

contract SkillFranchiseBadge is ERC1155, Ownable {
    address public registry;

    constructor()
        ERC1155(\"https://api.skillfranchise.com/metadata/{id}.json\")
        Ownable(msg.sender)
    {}

    function setRegistry(address _registry) external onlyOwner {
        registry = _registry;
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external {
        require(msg.sender == registry || msg.sender == owner(), \"Unauthorized\");
        _mint(to, id, amount, data);
    }
}
