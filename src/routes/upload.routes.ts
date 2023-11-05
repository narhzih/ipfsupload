import express from 'express';
import { UploadController } from '../controllers';
import { UploadMiddleware } from '../middlewares';

const router = express.Router();

router.post(
    '/upload',
    UploadMiddleware.uploadFile('image'),
    UploadController.uploadFile
);

export { router };
