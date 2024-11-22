import { ErrorSend } from "../../utils/errorHandle.js";
import { Task } from "../models/task.js";

class RepositoryTask {
  async addTask(
    taskName: string,
    title: string,
    description: string,
    isCompleted: boolean,
    next: Function
  ) {
    try {
      const task = {
        taskName,
        title,
        description,
        isCompleted,
      };
      const result = new Task(task);
      await result.save();
      return result;
    } catch (err) {
      next(new ErrorSend("Failed to create the task", 400, false, true));
    }
  }

  async getTask(_id: string) {
    try {
      const result = await Task.findById(_id);
      if (!result) {
        throw new ErrorSend("Task not found", 404, false, true);
      }
      return result;
    } catch (err) {
      throw new ErrorSend("Error fetching the Task", 500, false, true);
    }
  }

  async getAllTasks() {
    try {
      const result = await Task.find({});
      if (!result) {
        throw new ErrorSend("Tasks not found", 404, false, true);
      }
      return result;
    } catch (err) {
      throw new ErrorSend("Error fetching task", 500, false, true);
    }
  }

  async updateTask(
    _id: string,
    taskName?: string,
    title?: string,
    description?: string,
    isCompleted?: boolean
  ) {
    try {
      const updatedtask: {
        taskName?: string;
        title?: string;
        description?: string;
        isCompleted?: boolean;
      } = {};
      if (taskName) updatedtask.taskName = taskName;
      if (title) updatedtask.title = title;
      if (description) updatedtask.description = description;
      if (isCompleted) updatedtask.isCompleted = isCompleted;
      const result = await Task.findByIdAndUpdate(_id, updatedtask, {
        new: true,
      });
      if (!result) {
        throw new ErrorSend("task not found", 404, false, true);
      }
      return result;
    } catch (err) {
      throw new ErrorSend("Error updating task", 500, false, true);
    }
  }

  async deleteTask(_id: string) {
    try {
      const result = await Task.findByIdAndDelete(_id);
      if (!result) {
        throw new ErrorSend("Task not found", 404, false, true);
      }
      return result;
    } catch (err) {
      throw new ErrorSend("Error deleting Task", 500, false, true);
    }
  }
}

export default RepositoryTask;
