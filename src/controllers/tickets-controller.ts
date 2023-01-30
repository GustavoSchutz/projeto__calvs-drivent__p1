import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { TicketType } from "@prisma/client";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(_req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const tickets = await ticketsService.getTicketByEnrollmentId(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId: TicketType["id"] = req.body.ticketTypeId; 
  const userId = req.userId;

  if (!ticketTypeId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const newTicket = await ticketsService.postTicket(ticketTypeId, userId);
    return res.sendStatus(httpStatus.CREATED).send(newTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
