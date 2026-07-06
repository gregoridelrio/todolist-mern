const Task = require('../models/Task');
const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidators');

const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

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
    const { search, tag, completed } = req.query;

    const filter = {
      user: req.user._id
    };

    if (search) {
      filter.title = { $regex: escapeRegex(search), $options: 'i' };
    }

    if (tag) {
      filter.tags = { $regex: escapeRegex(tag), $options: 'i' };
    }

    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

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

const updateTask = async (req, res) => {
  try {
    const { error, value } = updateTaskSchema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      return res.status(400).json({
        message: 'Datos no válidos',
        errors: error.details.map((detail) => detail.message)
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      value,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: 'Tarea no encontrada'
      });
    }

    return res.status(200).json({
      message: 'Tarea actualizada correctamente',
      task
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        message: 'Tarea no encontrada'
      });
    }

    return res.status(200).json({
      message: 'Tarea eliminada correctamente'
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
  getTaskById,
  updateTask,
  deleteTask
};