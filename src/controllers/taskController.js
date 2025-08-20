const taskService = require('../services/taskService');

exports.getTasks = async (req, res) => {
  try {
    const { status, search, sortBy, page = 1, limit = 3 } = req.query;
    const result = await taskService.getAllTasks(status, search, sortBy, parseInt(page), parseInt(limit));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
