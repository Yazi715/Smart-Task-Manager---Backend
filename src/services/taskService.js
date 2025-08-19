const Task = require('../models/Task');

exports.getAllTasks = async (status) => {
  const filter = status ? { status } : {};
  return await Task.find(filter);
};

exports.getTaskById = async (id) => {
  return await Task.findById(id);
};

exports.createTask = async (taskData) => {
  const task = new Task(taskData);
  console.log("task created")
  return await task.save();
  
};

exports.updateTask = async (id, taskData) => {
    console.log("task updated")
  return await Task.findByIdAndUpdate(id, taskData, { new: true });
};

exports.deleteTask = async (id) => {
    console.log("task delted")
  return await Task.findByIdAndDelete(id);
};
