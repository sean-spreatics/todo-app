const express = require('express');
const app = express();
const PORT = 8080;
const todoRouter = require('./routes/todo');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', todoRouter); // 기본주소: localhost:PORT/api

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
