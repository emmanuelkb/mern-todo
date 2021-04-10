const router = require("express").Router();
const todoController = require("../controller/todoController");

router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodo);
router.patch("/:id", todoController.updateTodo);
router.patch("/:id/toggle", todoController.toggleCompleted);
router.delete("/:id", todoController.deleteTodo);
router.post("/", todoController.createTodo);

module.exports = router;
