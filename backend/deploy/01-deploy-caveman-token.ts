import { getContractFactory } from "@nomiclabs/hardhat-ethers/types";
import { ethers, network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains } from "../helper-hardhat-config";
import verify from "../utils/verify";

const deployCavemanToken = async (hre: HardhatRuntimeEnvironment) => {
    // `hre.getNamedAccounts()` returns the `namedAccounts` object from `hardhat.config.ts`
    const deployer = (await hre.getNamedAccounts()).deployer;
    const { deployments } = hre;
    const { deploy, log } = deployments;

    // `account1.address` === `deployer`
    const [account1, account2, account3] = await ethers.getSigners();

    const args: any[] = [300, [account1.address, account2.address, account3.address]];
    // `hardhat-deploy` type of deploying
    const cavemanTokenContract = await deploy("CavemanToken", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: network.name !== ("hardhat" || "localhost") ? 5 : 0,
    });

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(cavemanTokenContract.address, args);
    } else {
        console.log("Local network detected: no verification needed");
    }
    log("----------------------------------------------------------------------");
};

export default deployCavemanToken;

deployCavemanToken.tags = ["all", "cavemanToken"];
