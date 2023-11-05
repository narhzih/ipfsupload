import { Request, Response } from 'express';
import { Web3StorageService } from '../services';
import { HashHelpers } from '../helpers';

export const getFile = async (req: Request, res: Response) => {
    const fileUrl = HashHelpers.generateFileUrl(req.params.fileId);
    return res.status(200).json({
        message: 'You can retrieve the file content from the give fileUrl',
        fileUrl,
    });
};

export const getFileStatus = async (req: Request, res: Response) => {
    const web3Client = Web3StorageService.makeStorageClient();
};
