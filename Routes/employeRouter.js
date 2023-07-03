const { Router } = require("express");
const { EmployeeModel } = require("../Model/EmployeeModel.js");

const employeeController = Router();

employeeController.post("/employees", async (req, res) => {
  const { first_name, last_name, email, department, salary, userId } = req.body;
  const newEmployee = new EmployeeModel({
    first_name,
    last_name,
    email,
    department,
    salary,
    userId,
  });
  await newEmployee.save();
  res.send("New Employee data created");
});

employeeController.get("/", async (req, res) => {
  const employeeData = await EmployeeModel.find({ userId: req.body.userId });
  res.send(employeeData);
});

employeeController.patch("/update/:dataId", async (req, res) => {
  const { dataId } = req.params;
  const updateData = await EmployeeModel.findOneAndUpdate(
    { _id: dataId, userId: req.body.userId },
    { ...req.body }
  );
  if (updateData) {
    res.send("updated");
  } else {
    res.send("can't update");
  }
});

employeeController.delete("/delete/:dataId", async (req, res) => {
  const { dataId } = req.params;
  const updateData = await EmployeeModel.findOneAndDelete({
    _id: dataId,
    userId: req.body.userId,
  });
  if (updateData) {
    res.send("Deleted");
  } else {
    res.send("can't delete");
  }
});

employeeController.get("/limit=5", async (req, res) => {
  const employeeData = await EmployeeModel.find({
    userId: req.body.userId,
  }).limit(5);
  res.send(employeeData);
});

employeeController.get("/:filter", async (req, res) => {
  const { filter } = req.params;
  const employeeData = await EmployeeModel.find({
    userId: req.body.userId,
    department: filter,
  });
  res.send(employeeData);
});

employeeController.get("/:sort", async (req, res) => {
  const { sort } = req.params;
  if (sort === "asc") {
    const employeeData = await EmployeeModel.find({
      userId: req.body.userId,
    }).sort({ sort: 1 });
    res.send(employeeData);
  } else if (sort === "desc") {
    const employeeData = await EmployeeModel.find({
      userId: req.body.userId,
    }).sort({ sort: -1 });
    res.send(employeeData);
  }
});

employeeController.get("/:name", async (req, res) => {
  const { name } = req.params;

  const employeeData = await EmployeeModel.find({
    userId: req.body.userId,
    first_name: name,
  });
  res.send(employeeData);
});

module.exports = { employeeController };
