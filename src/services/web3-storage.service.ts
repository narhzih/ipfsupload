import { Web3Storage } from 'web3.storage';
import { filesFromPaths, FileLike } from 'files-from-path';

export const getAccessToken = (): string => {
    if (!process.env.WEB3STORAGE_TOKEN) {
        throw new Error('Invalid Web3 Storage token');
    }
    return process.env.WEB3STORAGE_TOKEN!;
};

export const makeStorageClient = () => {
    return new Web3Storage({ token: getAccessToken() });
};

export const getFiles = async (path: string): Promise<FileLike[]> => {
    const files = await filesFromPaths([path]);
    return files;
};
