const Todo = require("../model/Todo");

const createTodo = async (req, res) => {
  const { text, completed } = req.body;
  if (text === "") {
    return res.status(400).json({ message: "Enter a todo" });
  }
  const todo = await Todo.create({ text, completed });
  res.status(201).json({ todo });
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (text === "") {
    return res.status(400).json({ messgae: "Text cannot be empty" });
  }
  const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ todo });
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.status(200).json({ todo });
};

const getAllTodos = async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({ todos });
};

const toggleCompleted = async (req, res) => {
  const { id } = req.params;
  let todo = await Todo.findById(id);
  if (todo.completed) {
    todo = await Todo.findByIdAndUpdate(
      id,
      { completed: false },
      { new: true }
    );
    return res.status(200).json({ todo });
  } else {
    todo = await Todo.findByIdAndUpdate(id, { completed: true }, { new: true });
    return res.status(200).json({ todo });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.status(200).json({ message: "Todo succesfully deleted" });
};

module.exports = {
  createTodo,
  updateTodo,
  getAllTodos,
  getTodo,
  deleteTodo,
  toggleCompleted,
};
