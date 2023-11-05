import fs from 'fs';
import { Request, Response } from 'express';
import { Web3StorageService } from '../services';
import { HashHelpers } from '../helpers';
import { Constants } from '../constants';

export const uploadFile = async (req: Request, res: Response) => {
    if (req.file) {
        const web3Files = await Web3StorageService.getFiles(req.file.path);
        const web3Client = Web3StorageService.makeStorageClient();

        const fileSizeInMb = (req.file.size * Constants.BYTE_T0_MB).toFixed(4);
        const cid = await web3Client.put(web3Files);
        const fileId = `${cid}-${HashHelpers.encryptText(req.file.filename)}`;

        // -- clean file after it's been sent to Web3Storage for upload
        fs.unlinkSync(req.file.path);

        const status = await web3Client.status(cid);

        if (status) {
            return res.status(201).json({
                fileId,
                timestamp: status?.created,
                sizeInMB: fileSizeInMb,
                size: req.file.size,
            });
        }
    }

    return res.status(400).json({
        message:
            'Please attatch a file to be uploaded (Note: Maximum file size is 200MB)',
    });
};
