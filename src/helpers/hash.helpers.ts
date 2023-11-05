import * as crypto from 'crypto';
import { ErrorContants, UrlConstants } from '../constants';
import * as dotenv from 'dotenv';
dotenv.config();

const algo = 'aes-256-cbc'; //Using AES encryption

const key = crypto.scryptSync(
    process.env.SECRET_PHRASE!,
    process.env.SECRET_SALT!,
    32
);
const iv = crypto.scryptSync(
    process.env.SECRET_PHRASE!,
    process.env.SECRET_SALT!,
    16
);

const checkConfig = () => {
    if (!process.env.SECRET_PHRASE || !process.env.SECRET_SALT) {
        throw new Error(ErrorContants.INVALID_SECRET_ERROR);
    }
};
export const encryptText = (text: string) => {
    checkConfig();
    let cipher = crypto.createCipheriv(algo, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}_${encrypted.toString('hex')}`;
};

export const decryptText = (text: string) => {
    checkConfig();
    const [ivToString, encToString] = text.split('_');
    if (!ivToString || !encToString) {
        throw new Error(ErrorContants.INVALID_FILE_ID_ERROR);
    }
    let encryptedText = Buffer.from(encToString, 'hex');
    let decipher: any = '';
    try {
        decipher = crypto.createDecipheriv(
            algo,
            Buffer.from(key),
            Buffer.from(ivToString, 'hex')
        );
    } catch (e: any) {
        throw new Error(ErrorContants.INVALID_IV_ERROR);
    }
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

export const getCidFromFileId = (fileId: string) => {
    return fileId.split('-')[0];
};

export const getFilenameFromFileId = (fileId: string) => {
    const encFileId = fileId.split('-')[1];
    return decryptText(encFileId);
};

export const validateFileId = (fileId: string) => {};

export const generateFileUrl = (fileId: string) => {
    const fileName = getFilenameFromFileId(fileId);
    const cid = getCidFromFileId(fileId);

    return `${cid}.${UrlConstants.FILE_RENDER_URL}/${fileName}`;
};
