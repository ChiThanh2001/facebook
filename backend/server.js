const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true
}))
//routes
readdirSync("./routes").map((r) => app.use("/", require(`./routes/${r}`)));
//database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
