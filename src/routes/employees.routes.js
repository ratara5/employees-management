import "dotenv/config";
import { Router } from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employees.controller.js";

const router = Router();

router.get("/api/employees", getEmployees);
router.get("/api/employee/:id", getEmployee);

router.post("/api/employee/new", createEmployee);

router.put("/api/employee/update/:id", updateEmployee);

router.delete("/api/employee/delete/:id", deleteEmployee);

export default router;
