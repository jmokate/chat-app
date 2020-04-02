const express = require("express");
const app = express();
const path = require("path");
const port = 5000;

app.use("/client", express.static("client"));

app.get("/", (req, res) => {
  res.send("hiya");
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

app.listen(port, () => console.log(`app listening at ${port}`));
