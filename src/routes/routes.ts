import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../controllers/task.js';
import { handleValidationErrors, validateCreateTask, validateUpdateTask } from '../validation/validation.js';

const app = Router();
const controller = new Controller();

app.post('/task', validateCreateTask, handleValidationErrors, (req: Request, res: Response, next: NextFunction) => {
    controller.addTask(req, res, next); 
});

app.put('/task/:id', validateUpdateTask, handleValidationErrors, (req: Request, res: Response, next: NextFunction) => {
    controller.updateTask(req, res, next);
});

app.get('/tasks', (req: Request, res: Response, next: NextFunction) => {
    controller.tasks(req, res, next);
});

app.route('/task/:id')
    .get((req: Request, res: Response, next: NextFunction) => controller.getTask(req, res, next))
    .delete((req: Request, res: Response, next: NextFunction) => controller.deleteTask(req, res, next));

export default app;