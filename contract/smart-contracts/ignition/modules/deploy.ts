import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ResumeStorageModule", (m) => {
  const resumeStorage = m.contract("ResumeStorage");
  return { resumeStorage };
});
