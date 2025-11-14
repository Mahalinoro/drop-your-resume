import { network } from "hardhat";
const { viem } = await network.connect();
const publicClient = await viem.getPublicClient();
const [wallet1, wallet2, wallet3, wallet4] = await viem.getWalletClients();

const ResumeStorageAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ResumeStorage = await viem.getContractAt("ResumeStorage", ResumeStorageAddress);

async function setResumeData(CID: string, account: `0x${string}`) {
    const tx = await ResumeStorage.write.setResume([CID], { account: account });
    const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
    console.log(`Set resume CID: ${CID}, Tx Status: ${receipt.status}`);
}

async function getResumeData(account: `0x${string}`) {
    const cid = await ResumeStorage.read.getResume([account]);
    console.log(`Resume CID for ${account}: ${cid}`);
    return cid;
}

async function main() {
    await setResumeData("QmExampleCID1234567890", wallet1.account.address);
    await getResumeData(wallet1.account.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});