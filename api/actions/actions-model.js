// DO NOT MAKE CHANGES TO THIS FILE
const db = require("../../data/dbConfig.js");
const mappers = require("../../data/helpers/mappers");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

async function get() {
  const actions = await db("actions");

  return actions.map((action) => ({
    ...action,
    completed: action.completed === 1,
  }));
}

function getById(id) {
  let query = db("actions");

  if (id) {
    return query
      .where("id", id)
      .first()
      .then((action) => {
        if (action) {
          return mappers.actionToBody(action);
        } else {
          return null;
        }
      });
  } else {
    return query.then((actions) => {
      return actions.map((action) => mappers.actionToBody(action));
    });
  }
}

function insert(action) {
  action.completed = action.completed === 1;
  return db("actions")
    .insert(action)
    .then(([id]) => getById(id));
}

function update(id, changes) {
  if (changes.completed !== undefined) {
    changes.completed = changes.completed === 1;
  }
  return db("actions")
    .where("id", id)
    .update(changes)
    .then((count) => (count > 0 ? getById(id) : null));
}

function remove(id) {
  return db("actions").where("id", id).del();
}
