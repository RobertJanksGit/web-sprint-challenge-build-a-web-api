// add middlewares here related to actions
async function checkRoute(req, res, next) {
  const { body } = req;
  console.log(body);
  if (!body.notes || !body.description || !body.project_id) {
    res.status(400).send("Unauthorized");
  } else {
    res.status(200);
    next();
  }
}

async function checkRoute2(req, res, next) {
  const { body } = req;
  console.log(body);
  if (
    !body.notes ||
    !body.description ||
    !body.project_id ||
    body.completed === undefined
  ) {
    res.status(400).send("Unauthorized");
  } else {
    res.status(200);
    next();
  }
}
module.exports = { checkRoute, checkRoute2 };
