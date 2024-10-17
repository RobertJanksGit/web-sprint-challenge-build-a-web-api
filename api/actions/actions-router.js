const express = require("express");
const Actions = require("./actions-model");
const { checkActionId, checkBody } = require("./actions-middlware");

const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", [checkActionId, checkBody], async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedAction = await Actions.getById(id, req.body);
    res.status(200).json(updatedAction);
  } catch (err) {
    next(err);
  }
});

router.post("/", checkBody, async (req, res, next) => {
  try {
    const action = await Actions.insert(req.body);
    res.status(200).json(action);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", [checkActionId, checkBody], async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedAction = await Actions.update(id, req.body);
    res.status(200).json(updatedAction);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

router.delete("/:id", checkActionId, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Actions.remove(id);
    res.status(200).json();
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
