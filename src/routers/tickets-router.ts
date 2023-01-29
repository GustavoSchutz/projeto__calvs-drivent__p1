import { getTicketTypes } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .get("/types", getTicketTypes)
  .all("/*", authenticateToken)
  .get("/");

export { ticketsRouter };
