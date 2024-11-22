import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


export const validateCreateTask = [
  body("taskName")
    .notEmpty()
    .withMessage("task name is required")
    .isLength({ min: 3 })
    .withMessage("task name must be at least 3 characters long"),
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isNumeric()
    .withMessage("title must be a string"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
  body("isCompleted")
    .optional()
    .isBoolean()
    .withMessage("isCompleted must be a boolean"),
];

export const validateUpdateTask = [
  param("id").isMongoId().withMessage("Invalid task ID"),
  body("taskName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("task name must be at least 3 characters long"),
  body("title").optional().isNumeric().withMessage("title must be a string"),
  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
  body("isCompleted")
    .optional()
    .isBoolean()
    .withMessage("isCompleted must be a boolean"),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    next();
};