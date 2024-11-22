import { Request, Response, NextFunction } from "express";
import RepositoryTask from "../dataBase/repository/task.js";
import { ErrorSend } from "../utils/errorHandle.js";

class Controller {
  repository = new RepositoryTask();

  async tasks(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repository.getAllTasks();
      if (!result) {
        throw new ErrorSend("Failed to get all tasks", 404, false, true);
      }
      res.status(200).json(result);
    } catch (err: any) {
      next(new ErrorSend(err.message, err.status, false, true));
    }
  }

  async addTask(req: Request, res: Response, next: NextFunction) {
    const { taskName, title, description, isCompleted } = req.body;
    try {
      const result = await this.repository.addTask(
        taskName,
        title,
        description,
        isCompleted,
        next
      );
      res.status(201).json(result);
    } catch (err: any) {
      next(new ErrorSend(err.message, err.status, false, true));
    }
  }

  async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repository.getTask(req.params.id);
      res.status(200).json(result);
    } catch (err: any) {
      next(new ErrorSend(err.message, err.status, false, true));
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    const { taskName, title, description } = req.body;
    try {
      const result = await this.repository.updateTask(
        req.params.id,
        taskName,
        title,
        description
      );
      res.status(200).json(result);
    } catch (err: any) {
      next(new ErrorSend(err.message, err.status, false, true));
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      await this.repository.deleteTask(req.params.id);
      res.status(204).send(); // No content
    } catch (err: any) {
      next(new ErrorSend(err.message, err.status, false, true));
    }
  }
}

export default Controller;
