import * as crypto from 'crypto';

const algo = 'aes-256-cbc'; //Using AES encryption

const key = crypto.scryptSync('MY_SECRET_PASS_PHRASE', 'MY_SALT', 32);
const iv = crypto.scryptSync('MY_SECRET_PASS_PHRASE', 'MY_SALT', 16);

export const encryptText = (text: string) => {
    let cipher = crypto.createCipheriv(algo, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}_${encrypted.toString('hex')}`;
};

export const decryptText = (text: string) => {
    const [ivToString, encToString] = text.split('_');
    console.log(`ivToString ${ivToString}`);
    if (!ivToString || !encToString) {
        throw new Error('Invalid id provided');
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
        throw new Error(`An error occurred -${e.message}`);
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

export const generateFileUrl = (fileId: string) => {
    const fileName = getFilenameFromFileId(fileId);
    const cid = getCidFromFileId(fileId);

    return `${cid}.ipfs.w3s.link/${fileName}`;
};
