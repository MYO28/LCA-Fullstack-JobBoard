const express = require("express");
const cors = require("cors");
require("dotenv").config();

const jobRoutes = require("./routes/jobRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "JobBoard ZA API is running" });
});

app.use("/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`JobBoard ZA API listening on port ${PORT}`);
});
