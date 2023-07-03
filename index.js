const express = require("express");
const { connection } = require("./config/db.js");
const { UserModel } = require("./Model/UserModel.js");
const { userController } = require("./Routes/userRoutes.js");
const { authentication } = require("./Middleware/authentication.js");

const cors = require("cors");
const { employeeController } = require("./Routes/employeRouter.js");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("homepage");
});

app.use("/user", userController);

app.use(authentication);

app.use("/dashboard", employeeController);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to Data base");
  } catch (error) {
    console.log("error connecting to Data base");
  }
  console.log(`server listening at ${PORT} `);
});
