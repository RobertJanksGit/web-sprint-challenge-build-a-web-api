const Actions = require("./actions-model");

async function checkId(req, res, next) {
  try {
    const { id } = req.params;
    const action = await Actions.getById(id);
    console.log(action);
    if (action) {
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

module.exports = { checkId };
