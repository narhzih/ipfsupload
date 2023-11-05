import fs from 'fs';
import { Request, Response } from 'express';
import { Web3StorageService } from '../services';
import { HashHelpers } from '../helpers';

export const uploadFile = async (req: Request, res: Response) => {
    if (req.file) {
        // -- Leaving this comment just to show the initial approach used
        // const storedFile = fs.readFileSync(req.file.path);
        // const web3Files = [new File([storedFile], req.file.filename)];

        // -- This approach reduces memory pressure by yielding File objects one by one as they're loaded from disk
        const web3Files = await Web3StorageService.getFiles(req.file.path);
        const web3Client = Web3StorageService.makeStorageClient();
        const cid = await web3Client.put(web3Files);
        const fileId = `${cid}-${HashHelpers.encryptText(req.file.filename)}`;

        // -- clean file after it's been sent to Web3Storage for upload
        fs.unlinkSync(req.file.path);

        const status = await web3Client.status(cid);

        if (status) {
            return res.status(201).json({
                fileId,
                timestamp: status?.created,
                size: status.dagSize,
            });
        }

        return res.status(201).json({
            fileId: fileId,
            message:
                'File is currently being uploaded. You can make a request to /file/:fileId/status to get the current upload percentage of your file',
        });
    }

    return res.status(400).json({
        message:
            'Please attatch a file to be uploaded (Note: Maximum file size is 200MB)',
    });
};
