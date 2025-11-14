// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract ResumeStorage {
  mapping(address => string) private userResumes;

  event ResumeUpdated(address indexed user, string resumeCID);

  /* 
    * @dev Sets or updates the resume CID for the caller's address.
    * @param resumeCID The Pinata CID of the user's resume.
    * Emits a ResumeUpdated event upon successful update.
  */
  function setResume(string calldata resumeCID) external {
    userResumes[msg.sender] = resumeCID;
    emit ResumeUpdated(msg.sender, resumeCID);
  }

  /* 
    * @dev Retrieves the resume CID for a given user's address.
    * @param user The address of the user whose resume is being requested.
    * @return The Pinata CID of the user's resume.
  */
  function getResume(address user) external view returns (string memory) {
    return userResumes[user];
  }
}
