import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import { Enrollment, Ticket, TicketType } from "@prisma/client";

export type TicketDataType = {
  id: number;
  status: string;
  ticketTypeId: number;
  enrollmentId: number;
  TicketType: {
    id: number;
    name: string;
    price: number;
    isRemote: boolean;
    includesHotel: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
};

async function getTicketTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketRepository.getTicketTypes();

  return ticketTypes;
}

async function getTicketByEnrollmentId(userId: number): Promise<Ticket> {
  const enrollment: Enrollment = await ticketRepository.getEnrollmentByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const userTicket: Ticket = await ticketRepository.getTicketByEnrollmentId(enrollment.id);
  if (!userTicket) {
    throw notFoundError();
  }

  return userTicket;
}

async function postTicket(ticketTypeId: number, userId: number): Promise<TicketDataType> {
  const enrollment: Enrollment = await ticketRepository.getEnrollmentByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }
  const enrollmentId: number = enrollment.id;

  const newTicket = await ticketRepository.postNewTicketByTicketType(ticketTypeId, enrollmentId);

  return newTicket;
}

const ticketsService = {
  getTicketTypes,
  getTicketByEnrollmentId,
  postTicket
};

export default ticketsService;
