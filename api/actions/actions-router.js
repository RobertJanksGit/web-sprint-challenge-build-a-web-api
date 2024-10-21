// Write your "actions" router here!

const express = require("express");
const { checkRoute, checkRoute2 } = require("./actions-middlware");
const { get, insert, update, remove } = require("./actions-model");
const server = express();
//console.table({ id: 1, name: 'Azeem' })
server.use(express.json());

server.get("/", async (req, res) => {
  try {
    const actions = await get();
    if (!actions) {
      res.status(404).send([]);
    } else {
      res.status(200).json(actions);
    }
  } catch (err) {
    res.status(500).json({ status: "Not found" });
  }
});

server.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const actions = await get(id);
    console.log(actions);
    if (!actions) {
      res.status(404).send([]);
    } else {
      res.status(200).json(actions);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
server.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const actions = await remove(id);
    if (!actions) {
      res.status(404);
    } else {
      res.status(200).json(actions);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//needs a way to check if the body has everything it needs
server.put("/:id", checkRoute2, async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const actions = await update(id, body);
    if (!actions) {
      res.status(404);
    } else {
      res.status(200).json(actions);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

server.post("/", checkRoute, async (req, res) => {
  const { body } = req;
  try {
    const actions = await insert(body);
    console.log(actions);
    if (!actions) {
      res.status(404);
    } else {
      res.status(200).json(actions);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = server;
