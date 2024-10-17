const express = require("express");
const Projects = require("./projects-model");
const { checkProjects, checkId, checkBody } = require("./projects-middleware");

const router = express.Router();

router.get("/", checkProjects, async (req, res, next) => {
  try {
    req.body = await Projects.get();
    res.status(200).json(req.body);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkId, async (req, res, next) => {
  try {
    const { id } = req.params;
    req.body = await Projects.getById(id);
    res.status(200).json(req.body);
  } catch (err) {
    next(err);
  }
});

router.post("/", checkBody, async (req, res, next) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", [checkId, checkBody], async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProject = await Projects.update(id, req.body);
    res.status(200).json(updatedProject);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", checkId, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Projects.remove(id);
    res.status(200).json();
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", checkId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const actions = await Projects.getProjectActions(id);
    res.status(200).json(actions);
  } catch (err) {
    next();
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
