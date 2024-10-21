// add middlewares here related to projects

async function missingParts(req, res, next) {
  const { body } = req;
  console.log(body);
  if (!body.name || !body.description) {
    res.status(400).send("Unauthorized");
  } else {
    res.status(200);
    next();
  }
}

async function missingParts2(req, res, next) {
  const { body } = req;
  console.log(body.completed);
  if (!body.name || !body.description || body.completed === undefined) {
    res.status(400).send("Unauthorized");
  } else {
    next();
  }
}
module.exports = { missingParts, missingParts2 };
