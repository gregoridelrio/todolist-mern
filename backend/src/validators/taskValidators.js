const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).required(),
  description: Joi.string().trim().allow('').max(500).optional(),
  tags: Joi.array().items(Joi.string().trim().min(1).max(30)).default([]),
  completed: Joi.boolean().optional()
});

module.exports = {
  createTaskSchema
};