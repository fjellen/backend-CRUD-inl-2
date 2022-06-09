const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//import routes
const userRouter = require("./api/users");

//development env vars
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);

//endpoints
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  },
  () => console.log("Connected to database")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
