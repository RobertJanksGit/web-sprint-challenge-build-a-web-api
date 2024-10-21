const express = require("express");
const Actions = require("./actions-model");
const { checkActionId, checkBody } = require("./actions-middlware");

const router = express.Router();

function convertToNumber(val) {
  if (typeof val === "boolean") {
    return +val;
  } else {
    return val;
  }
}

// Normalize "completed" field if it exists in action
const normalizeCompleted = (action) => ({
  ...action,
  completed: Boolean(action.completed),
});

// GET all actions
router.get("/", async (req, res, next) => {
  try {
    let actions = await Actions.get();
    actions = actions.map(normalizeCompleted);
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

// GET an action by ID
router.get("/:id", [checkActionId], async (req, res, next) => {
  try {
    const { id } = req.params;
    const action = await Actions.getById(id);
    if (action) {
      console.log(action);
      res.status(200).json(normalizeCompleted(action));
    } else {
      res.status(404).json({ message: "Action not found" });
    }
  } catch (err) {
    next(err);
  }
});

// POST a new action
router.post("/", checkBody, async (req, res, next) => {
  try {
    let action = await Actions.insert(req.body);
    action = normalizeCompleted(action);
    res.status(201).json(action);
  } catch (err) {
    next(err);
  }
});

// PUT (update) an action
router.put("/:id", [checkActionId, checkBody], async (req, res, next) => {
  try {
    const { id } = req.params;
    req.body = { ...req.body, completed: convertToNumber(req.body.completed) };
    let updatedAction = await Actions.update(id, req.body);
    console.log(updatedAction);
    updatedAction = normalizeCompleted(updatedAction);

    res.status(200).json(updatedAction);
  } catch (err) {
    next(err);
  }
});

// DELETE an action
router.delete("/:id", checkActionId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const actions = await Actions.remove(id);
    console.log(actions);
    res
      .status(200)
      .json({ message: `Action with ID ${id} deleted successfully` });
  } catch (err) {
    next(err);
  }
});

// Global error handling middleware
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
