const OLD_ENV = process.env;
process.env = {
    ...OLD_ENV,
    SECRET_PHRASE: 'MY_SECRET_PASS_PHRASE',
    SECRET_SALT: 'MY_SALT',
    FILE_ID:
        'bafybeieysbhzkm5cumq7mlbogooa3i4xb7wuivl4s6c5bkku4gigmo7hae-1f76c7c76d4d24bee6f85b43febed56f_acc7ef4b64b858c676a2fa7f46e94dc7bdef0510fa01ddba7a8d13685c22ca2e',
    INVALID_FILE_ID: 'ggg-ggg',
};
