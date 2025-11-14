import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";

describe("ResumeStorage", async function () {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();
  const [wallet1, wallet2, wallet3] = await viem.getWalletClients();
  const ResumeStorage = await viem.deployContract("ResumeStorage");

  it("should set resume data correctly", async function () {
    const resumeCID = "QmTestResumeCID1234567890";

    await ResumeStorage.write.setResume([resumeCID]);
    const storedCID = await ResumeStorage.read.getResume([wallet1.account.address]);
    
    assert.equal(storedCID, resumeCID, "The stored resume CID should match the set CID");
  });

  it("should update resume data correctly", async function () {
    const initialCID = "QmInitialResumeCID1234567890";
    const updatedCID = "QmUpdatedResumeCID0987654321";

    await ResumeStorage.write.setResume([initialCID]);
    let storedCID = await ResumeStorage.read.getResume([wallet1.account.address]);
    assert.equal(storedCID, initialCID, "The stored resume CID should match the initial CID");

    await ResumeStorage.write.setResume([updatedCID]);
    storedCID = await ResumeStorage.read.getResume([wallet1.account.address]);
    assert.equal(storedCID, updatedCID, "The stored resume CID should match the updated CID");
  });

  it("should handle multiple users' resume data correctly", async function () {
    const cidUser1 = "QmUser1ResumeCID1234567890";
    const cidUser2 = "QmUser2ResumeCID0987654321";

    await ResumeStorage.write.setResume([cidUser1], { account: wallet1.account.address });
    await ResumeStorage.write.setResume([cidUser2], { account: wallet2.account.address });

    const storedCIDUser1 = await ResumeStorage.read.getResume([wallet1.account.address]);
    const storedCIDUser2 = await ResumeStorage.read.getResume([wallet2.account.address]);

    assert.equal(storedCIDUser1, cidUser1, "The stored resume CID for user 1 should match");
    assert.equal(storedCIDUser2, cidUser2, "The stored resume CID for user 2 should match");
  });

 
});
