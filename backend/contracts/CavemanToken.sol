// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// "Ownable" helps with managing the contract ownership
import "@openzeppelin/contracts/access/Ownable.sol";

contract CavemanToken is ERC20, Ownable {
    uint256 public constant tokenPrice = 0 ether;

    // Max total supply is 1000 Caveman Tokens
    uint256 public constant MAX_TOTAL_SUPPLY = 1000 * 10**18;

    constructor(uint256 amount, address[] memory eligibleAddresses) ERC20("Caveman Token", "CAVE") {
        uint256 amountWithDecimals = amount * 10**18;
        // Already minted token supply + requested mint amount cannot exceed max totaly supply
        require(
            totalSupply() + (amountWithDecimals * eligibleAddresses.length) <= MAX_TOTAL_SUPPLY,
            "Max supply exceeded"
        );
        // Unbounded loop is an anti pattern
        for (uint256 i = 0; i < eligibleAddresses.length; i++) {
            _mint(eligibleAddresses[i], amountWithDecimals);
        }
    }

    /**
     * @dev Mints `amount` number of Caveman Tokens
     * Requirements:
     * - `msg.value` should be equal or greater than the tokenPrice * amount
     * - Total minted token count should not be higher than `MAX_TOTAL_SUPPLY`
     * - Only contract owner can mint the tokens (unfair but done for simplicity sake)
     */
    // function mint(uint256 amount, address[] calldata eligibleAddresses) public {
    //     require("")
    //     uint256 amountWithDecimals = amount * 10**18;
    //     // Already minted token supply + requested mint amount cannot exceed max totaly supply
    //     require(totalSupply() + amountWithDecimals <= MAX_TOTAL_SUPPLY, "Max supply exceeded");
    //     _mint(msg.sender, amountWithDecimals);
    // }
}
