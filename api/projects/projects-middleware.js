const Projects = require("./projects-model");

function convertToNumber(val) {
  if (typeof val === "boolean") {
    return +val;
  } else {
    return val;
  }
}

async function checkProjects(req, res, next) {
  try {
    const projects = await Projects.get();
    if (projects) {
      next();
    } else {
      next({ statusbar: 404, message: "No projects found." });
    }
  } catch (err) {
    next(err);
  }
}

async function checkId(req, res, next) {
  try {
    const { id } = req.params;
    const project = await Projects.getById(id);
    if (project) {
      next();
    } else {
      next({
        status: 404,
        message: `Project with the given id not found.`,
      });
    }
  } catch (err) {
    next(err);
  }
}

function checkBody(req, res, next) {
  const { name, description, completed } = req.body;
  const convertedCompleted = convertToNumber(completed);
  if (!name || !description || typeof convertedCompleted !== "number") {
    return res.status(400).json({ message: "Missing required fields" });
  }
  res.body = req.body;
  next();
}

module.exports = { checkProjects, checkId, checkBody };
