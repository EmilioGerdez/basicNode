const express = require('express');
const app = express();
const port = 3000;

const myRoutes = require('./routes/routes');

app.use('/', myRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});