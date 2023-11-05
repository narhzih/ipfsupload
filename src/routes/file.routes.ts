import express from 'express';
import { FileController } from '../controllers';

const router = express.Router();

router.get('/file/:fileId', FileController.getFile);

export { router };
