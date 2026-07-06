const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).required(),
  description: Joi.string().trim().allow('').max(500).optional(),
  tags: Joi.array().items(Joi.string().trim().min(1).max(30)).default([]),
  completed: Joi.boolean().optional()
});

const updateTaskSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).optional(),
  description: Joi.string().trim().allow('').max(500).optional(),
  tags: Joi.array().items(Joi.string().trim().min(1).max(30)).optional(),
  completed: Joi.boolean().optional()
}).min(1);

module.exports = {
  createTaskSchema,
  updateTaskSchema
};