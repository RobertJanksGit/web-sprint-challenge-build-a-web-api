const Projects = require("./projects-model");

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
    console.log(project);
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

async function checkBody(req, res, next) {
  try {
    const body = req.body;
    console.log(body.name);
    if (body.name && body.description && typeof body.completed === "number") {
      next();
    } else {
      next({ status: 400, message: "Invalid request body." });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { checkProjects, checkId, checkBody };
