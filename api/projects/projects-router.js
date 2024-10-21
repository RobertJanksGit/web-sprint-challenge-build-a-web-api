const express = require("express");
const Projects = require("./projects-model");
const { checkProjects, checkId, checkBody } = require("./projects-middleware");

const router = express.Router();

// Normalize "completed" field
const normalizeCompleted = (project) => ({
  ...project,
  completed: Boolean(project.completed),
});

// GET all projects
router.get("/", checkProjects, async (req, res, next) => {
  try {
    let projects = await Projects.get();
    projects = projects.map(normalizeCompleted);
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

// GET a project by ID
router.get("/:id", checkId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Projects.getById(id);
    if (project) {
      res.status(200).json(normalizeCompleted(project));
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    next(err);
  }
});

// POST a new project
router.post("/", checkBody, async (req, res, next) => {
  try {
    let project = await Projects.insert(req.body);
    project = normalizeCompleted(project);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

// PUT (update) a project
router.put("/:id", [checkId, checkBody], async (req, res, next) => {
  try {
    const { id } = req.params;
    let updatedProject = await Projects.update(id, req.body);
    updatedProject = normalizeCompleted(updatedProject);
    res.status(200).json(updatedProject);
  } catch (err) {
    next(err);
  }
});

// DELETE a project
router.delete("/:id", checkId, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Projects.remove(id);
    res
      .status(200)
      .json({ message: `Project with ID ${id} deleted successfully` });
  } catch (err) {
    next(err);
  }
});

// GET all actions for a project
router.get("/:id/actions", checkId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const actions = await Projects.getProjectActions(id);
    res.status(200).json(actions);
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
