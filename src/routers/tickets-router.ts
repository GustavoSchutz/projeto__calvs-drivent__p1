import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .get("/types")
  .all("/*", authenticateToken)
  .get("/");
export { ticketsRouter };
