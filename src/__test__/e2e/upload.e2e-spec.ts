import request from 'supertest';
import { app } from '../../app';

describe('test the file upload process /upload', () => {
    it('returns 400 when no file is sent', async () => {
        return await request(app).post('/upload').expect(400);
    });
});
