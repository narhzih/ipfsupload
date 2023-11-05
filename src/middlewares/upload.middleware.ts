import multer from 'multer';
import fs from 'fs';

const dir = './public/tmp';

export const uploadFile = (fileKey: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1000);
            cb(
                null,
                file.fieldname +
                    '-' +
                    `${uniqueSuffix}.${file.mimetype.split('/')[1]}`
            );
        },
    });
    const upload = multer({ storage: storage });
    return upload.single(fileKey);
};
