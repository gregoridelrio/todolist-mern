const Task = require('../models/Task');
const { createTaskSchema } = require('../validators/taskValidators');

const createTask = async (req, res) => {
  try {
    const { error, value } = createTaskSchema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      return res.status(400).json({
        message: 'Datos no válidos',
        errors: error.details.map((detail) => detail.message)
      });
    }

    const task = await Task.create({
      ...value,
      user: req.user._id
    });

    return res.status(201).json({
      message: 'Tarea creada correctamente',
      task
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      tasks
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        message: 'Tarea no encontrada'
      });
    }

    return res.status(200).json({
      task
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById
};