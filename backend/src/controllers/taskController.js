const Task = require('../models/Task');
const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidators');

const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const handleControllerError = (error, res) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'ID de tarea no válido' });
  }

  console.error(error);
  return res.status(500).json({ message: 'Error interno del servidor' });
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
    return handleControllerError(error, res);
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
    return handleControllerError(error, res);
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
    return handleControllerError(error, res);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};