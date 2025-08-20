const Task = require('../models/Task');

exports.getAllTasks = async (status, search, sortBy, page = 1, limit = 3) => {
  const filter = {};
  if (status && status !== "All") filter.status = status;
  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [{ title: regex }, { description: regex }];
  }
  let sort = {};
  if (sortBy === "createdAt") sort = { createdAt: -1 };
  else if (sortBy === "status") sort = { status: 1 };

  const skip = (page - 1) * limit;
  const tasks = await Task.find(filter).sort(sort).skip(skip).limit(limit);
  const total = await Task.countDocuments(filter);
  return { tasks, total };
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
    console.log("task deleted")
  return await Task.findByIdAndDelete(id);
};
