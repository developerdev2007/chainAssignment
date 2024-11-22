"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateUpdateService = exports.validateCreateService = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateService = [
    (0, express_validator_1.body)('serviceName')
        .notEmpty().withMessage('Service name is required')
        .isLength({ min: 3 }).withMessage('Service name must be at least 3 characters long'),
    (0, express_validator_1.body)('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a number'),
    (0, express_validator_1.body)('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
];
exports.validateUpdateService = [
    (0, express_validator_1.param)('id')
        .isMongoId().withMessage('Invalid service ID'),
    (0, express_validator_1.body)('serviceName')
        .optional()
        .isLength({ min: 3 }).withMessage('Service name must be at least 3 characters long'),
    (0, express_validator_1.body)('price')
        .optional()
        .isNumeric().withMessage('Price must be a number'),
    (0, express_validator_1.body)('description')
        .optional()
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
];
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
