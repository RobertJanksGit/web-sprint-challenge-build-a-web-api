// Write your "projects" router here!
const express = require("express");
const {
  get,
  insert,
  update,
  remove,
  getProjectActions,
} = require("./projects-model");
const server = express();
const { missingParts, missingParts2 } = require("./projects-middleware");
server.use(express.json());

server.get("/", async (req, res) => {
  try {
    const projects = await get();
    if (!projects) {
      res.status(404).send([]);
    } else {
      res.status(200).json(projects);
    }
  } catch (err) {
    res.status(500).json({ status: "Not found" });
  }
});

server.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await get(id);
    if (!projects) {
      res.status(404).send();
    } else {
      res.status(200).json(projects);
    }
  } catch (err) {
    res.status(500).json({ status: "Not found" });
  }
});
server.post("/", missingParts, async (req, res) => {
  try {
    const { body } = req;
    const projects = await insert(body);
    if (!projects) {
      res.status(400).send();
    } else {
      res.status(200).json(projects);
    }
  } catch (err) {
    res.status(500).json({ status: "Not found" });
  }
});
server.put("/:id", missingParts2, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const projects = await update(id, body);
    if (!projects) {
      res.status(400).send();
    } else {
      res.status(200).json(projects);
    }
  } catch (err) {
    res.status(500).json({ status: "Not found" });
  }
});
server.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await remove(id);
    if (!projects) {
      res.status(404).send();
    } else {
      res.status(200).json(projects);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
server.get("/:id/actions", async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await getProjectActions(id);
    if (!projects) {
      res.status(404).send();
    } else {
      res.status(200).json(projects);
    }
  } catch (err) {
    res.status(500).json({ status: "Not found" });
  }
});

module.exports = server;
