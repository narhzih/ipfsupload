"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileUrl = exports.getFilenameFromFileId = exports.getCidFromFileId = exports.decryptText = exports.encryptText = void 0;
var crypto = require("crypto");
var algo = 'aes-256-cbc'; //Using AES encryption
var key = crypto.scryptSync('MY_SECRET_PASS_PHRASE', 'MY_SALT', 32);
var iv = crypto.scryptSync('MY_SECRET_PASS_PHRASE', 'MY_SALT', 16);
var encryptText = function (text) {
    var cipher = crypto.createCipheriv(algo, Buffer.from(key), iv);
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return "".concat(iv.toString('hex'), "_").concat(encrypted.toString('hex'));
};
exports.encryptText = encryptText;
var decryptText = function (text) {
    var _a = text.split('_'), ivToString = _a[0], encToString = _a[1];
    console.log("ivToString ".concat(ivToString));
    if (!ivToString || !encToString) {
        throw new Error('Invalid id provided');
    }
    var encryptedText = Buffer.from(encToString, 'hex');
    var decipher = '';
    try {
        decipher = crypto.createDecipheriv(algo, Buffer.from(key), Buffer.from(ivToString, 'hex'));
    }
    catch (e) {
        throw new Error("An error occurred -".concat(e.message));
    }
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};
exports.decryptText = decryptText;
var getCidFromFileId = function (fileId) {
    return fileId.split('-')[0];
};
exports.getCidFromFileId = getCidFromFileId;
var getFilenameFromFileId = function (fileId) {
    var encFileId = fileId.split('-')[1];
    return (0, exports.decryptText)(encFileId);
};
exports.getFilenameFromFileId = getFilenameFromFileId;
var generateFileUrl = function (fileId) {
    var fileName = (0, exports.getFilenameFromFileId)(fileId);
    var cid = (0, exports.getCidFromFileId)(fileId);
    return "".concat(cid, ".ipfs.w3s.link/").concat(fileName);
};
exports.generateFileUrl = generateFileUrl;
var dValue = (0, exports.encryptText)('Olawale_Omosekeji_00000');
console.log(dValue);
var dec = (0, exports.decryptText)(dValue);
console.log(dec);
