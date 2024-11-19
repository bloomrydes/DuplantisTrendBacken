require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
const user = require("./routes/route");
const cors = require("cors");;
const app = express();
const port = process.env.PORT || 9000;
dbConnect()
app.use(morgan("tiny"));
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For URL-encoded data

app.use(cors());



app.use(express.static(path.join(__dirname, "public")));
// Middleware

app.use("/api/v1/", user);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
