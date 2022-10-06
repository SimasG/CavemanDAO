import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { CavemanToken } from "../../typechain-types";

describe("CavemanDAO", function () {
    let cavemanTokenContract: CavemanToken;
    let deployer: SignerWithAddress;
    let user: SignerWithAddress;

    // beforeEach
    beforeEach(async function () {
        // deployer = (await getNamedAccounts()).deployer;
        // user = (await getNamedAccounts()).user;

        // * I could also have used `getSigners` to get the first two accounts in the account list
        // * (`deployer.address` & `user.address`). First is by default the contract
        // * deployer/owner. No need to used named accounts either here. I like this method more
        [deployer, user] = await ethers.getSigners();
        await deployments.fixture(["all"]);

        cavemanTokenContract = await ethers.getContract("CavemanToken", deployer);
    });

    describe("constructor", function () {
        it("Should auto mint tokens to the eligible addresses", async function () {
            // Getting latest deployed instance of `CavemanToken`
            // `account1.address` is the `deployer`
            const [account1, account2, account3] = await ethers.getSigners();
            const account1Balance = parseInt(
                ethers.utils.formatEther(await cavemanTokenContract.balanceOf(account1.address))
            );
            const account2Balance = parseInt(
                ethers.utils.formatEther(await cavemanTokenContract.balanceOf(account2.address))
            );
            const account3Balance = parseInt(
                ethers.utils.formatEther(await cavemanTokenContract.balanceOf(account3.address))
            );
            expect(account1Balance).to.be.equal(300);
            expect(account2Balance).to.be.equal(300);
            expect(account3Balance).to.be.equal(300);
        });
        // Would like to elegantly check if calling constructor would revert if total max supply is exceeded
        // but it's more difficult to check for constructors
    });

    // it("Should mint tokens for the contract owner", async function () {
    //     // Getting latest deployed instance of `CavemanToken`
    //     const tx = await cavemanTokenContract.mint(500);
    //     const deployerCavemanTokenBalance = parseInt(ethers.utils.formatEther(await cavemanTokenContract.balanceOf(deployer.address)));
    //     const userCavemanTokenBalance = parseInt(ethers.utils.formatEther(await cavemanTokenContract.balanceOf(user.address)));
    //     expect(deployerCavemanTokenBalance).to.be.equal(500);
    // });
    // it("Should revert the tx since the caller is not the contract owner", async function () {
    //     // Still don't understand why we put `await` in front instead of before `cavemanTokenContract`
    //     await expect(cavemanTokenContract.connect(user).mint(500)).to.be.revertedWith("Ownable: caller is not the owner");
    // });
    // it("Should revert the tx since max total supply is exceeded", async function () {
    //     const tx = await cavemanTokenContract.mint(500);
    //     await expect(cavemanTokenContract.mint(501)).to.be.revertedWith("Max supply exceeded");
    // });
});
