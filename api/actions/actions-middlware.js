const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

async function checkActionId(req, res, next) {
  try {
    const { id } = req.params;
    const actions = await Actions.getById(id);
    if (actions) {
      next();
    } else {
      next({
        status: 404,
        message: "Action with the given id not found",
      });
    }
  } catch (err) {
    next(err);
  }
}

async function checkBody(req, res, next) {
  try {
    const body = req.body;
    if (
      !body.description ||
      !body.notes ||
      typeof body.project_id !== "number" ||
      typeof body.completed !== "number"
    ) {
      next({ status: 400, message: "Invalid request body." });
    }
    const { id } = body.project_id;
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

module.exports = { checkActionId, checkBody };
