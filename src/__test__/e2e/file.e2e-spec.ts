import request from 'supertest';
import { app } from '../../app';

describe('tests the file fetching process /file/:fileId', () => {
    it('returns 400 for an invalid fileId', async () => {
        return request(app)
            .get(`/file/${process.env.INVALID_FILE_ID}`)
            .expect(400);
    });

    it('returns a 200 response for a valid fileId', async () => {
        return request(app).get(`/file/${process.env.FILE_ID}`).expect(200);
    });
});
