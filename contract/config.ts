import ResumeStorage from './ResumeStorage.json'

export const CONTRACT_NAME = 'ResumeStorage';
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_RESUME_STORAGE_CONTRACT_ADDRESS || '';
export const CONTRACT_ABI = ResumeStorage.abi;
