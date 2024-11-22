import supertest from 'supertest';
import express from 'express';
import taskRoutes from '../routes/routes.js'; 
import { connectDB } from '../utils/connection.js'; 
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use('/api', taskRoutes);

const request = supertest(app); // Create a request object bound to the app

beforeAll(async () => {
    await connectDB(); // Ensure this is awaited
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Task Routes', () => {
    let taskId:string;

    it('should create a new task', async () => {
        const response = await request
            .post('/api/task')
            .send({
                taskName: 'Test Task',
                title: "Test Title",
                description: 'This is a test Task.',
                isCompleted: true
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id'); // Correct property for ID
        expect(response.body.taskName).toBe('Test task');

        taskId = response.body._id; // Store the ID for later tests
    });

    it('should return all tasks', async () => {
        const response = await request.get('/api/tasks');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return a single task', async () => {
        const response = await request.get(`/api/task/${taskId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', taskId); // Use _id for comparison
    });

    it('should update a task', async () => {
        const response = await request
            .put(`/api/task/${taskId}`)
            .send({
                taskName: 'Updated task',
                title: "Updated Title",
                description: 'This is an updated test task.',
                isCompleted: false
            });

        expect(response.status).toBe(200);
        expect(response.body.taskName).toBe('Updated task');
    });

    it('should delete a task', async () => {
        const response = await request.delete(`/api/task/${taskId}`);

        expect(response.status).toBe(204);
    });
});