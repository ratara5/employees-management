import "dotenv/config";
import { Router } from "express";
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applications.controller.js";

const router = Router();

router.get("/api/applications", getApplications);
router.get("/api/application/:id", getApplication);

router.post("/api/application/new", createApplication);

router.put("/api/application/update/:id", updateApplication);

router.delete("/api/application/delete/:id", deleteApplication);

export default router;
