const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

function convertToNumber(val) {
  if (typeof val === "boolean") {
    return +val;
  } else {
    return val;
  }
}

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
    const { notes, description, project_id, completed } = req.body;
    const convertedCompleted = convertToNumber(completed);
    if (
      !description ||
      !notes ||
      typeof project_id !== "number" ||
      typeof convertedCompleted !== "number"
    ) {
      next({ status: 400, message: "Invalid request body." });
    }
    const { id } = project_id;
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
