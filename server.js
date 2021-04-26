const express = require("express");
const cors = require("cors");

require("./Config/dbConnect");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/todo", require("./router/todoRouter"));
app.use("/auth", require("./router/authRouter"));

module.exports = app.listen(4000, () => console.log("Listening on 4000"));
