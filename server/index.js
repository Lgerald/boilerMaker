const path = require('path');
const express = require('express');
const app = express();


app.use(express.static(path.join(__dirname, '../public')))

// Any routes / middlewares

app.get("*", function(req, res, next) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal Error");
});

module.exports = app;