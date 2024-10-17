const express = require("express");
const {} = require("./projects-middleware");

const router = express.Route();

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
