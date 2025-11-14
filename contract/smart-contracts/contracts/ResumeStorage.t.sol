// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {ResumeStorage} from "./ResumeStorage.sol";
import {Test} from "forge-std/Test.sol";

contract ResumeStorageTest is Test {
  ResumeStorage resumeStorage;
  
  function setUp() public {
    resumeStorage = new ResumeStorage();
  }

  function testSetAndGetResume() public {
    address user = address(0x123);
    string memory cid = "QmTestCID";

    // Simulate user setting their resume
    vm.prank(user);
    resumeStorage.setResume(cid);

    // Retrieve the resume and verify
    string memory retrievedCID = resumeStorage.getResume(user);
    assertEq(retrievedCID, cid);
  }
}
