import {
    encryptText,
    decryptText,
    getCidFromFileId,
    getFilenameFromFileId,
    generateFileUrl,
} from '../hash.helpers';

describe('test encryption process', () => {
    const testValue = 'A plain text for test';
    let encryptedValue = '';

    it('should encrypt and decrypt correctly', () => {
        encryptedValue = encryptText(testValue);
        const decryptedValue = decryptText(encryptedValue);
        expect(decryptedValue).toBe(testValue);
    });
});

describe('test fileId manipulation process', () => {
    // A single fileId follows the pattern ${cid-encryptedFileName}
    const cid = 'bafybeigdwafqmxyhhzzyna5u75avyjf5gnb3jx274noku6dvxdznk4wiwu';
    const fileName = 'image-0000-222.jpg';
    const fileId = `${cid}-${encryptText(fileName)}`;
    const fileUrl = `${cid}.ipfs.w3s.link/${fileName}`;

    describe('getCidFromFileId()', () => {
        it('should return a valid cid', () => {
            const retCid = getCidFromFileId(fileId);
            expect(retCid).toBeDefined();
            expect(retCid).toBe(cid);
        });
    });

    describe('getFilenameFromFileId()', () => {
        it('should return a valid filename', () => {
            const retFileName = getFilenameFromFileId(fileId);
            expect(retFileName).toBeDefined();
            expect(retFileName).toBe(fileName);
        });
    });

    describe('generateFileUrl()', () => {
        it('should return a valid fileUrl', () => {
            const retFileUrl = generateFileUrl(fileId);
            expect(retFileUrl).toBeDefined();
            expect(retFileUrl).toBe(fileUrl);
        });
    });
});
