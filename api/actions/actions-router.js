const express = require("express");
const Actions = require("./actions-model");
const { checkId } = require("./actions-middlware");

const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkId, async (req, res, next) => {
  try {
    const { id } = req.params;
    req.body = await Actions.getById(id);
    res.status(200).json(req.body);
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
