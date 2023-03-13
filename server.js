const express = require("express")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { Controller } = require("./routes");
dotenv.config();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
Controller(app);

app.listen(process.env.PORT || 5000, () => {
console.log("Backend server is running!");
});