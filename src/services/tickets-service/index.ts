import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import { Enrollment } from "@prisma/client";

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.getTicketTypes();

  return ticketTypes;
}

async function  getTicketByEnrollmentId(userId: number) {
  const enrollment: Enrollment = await ticketRepository.getEnrollmentByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const userTicket = await ticketRepository.getTicketByEnrollmentId(enrollment.id);
  if (!userTicket) {
    throw notFoundError();
  }

  return userTicket;
}

const ticketsService = {
  getTicketTypes,
  getTicketByEnrollmentId
};

export default ticketsService;
