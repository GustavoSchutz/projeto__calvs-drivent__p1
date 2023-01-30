import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

export type CardType = {
  issuer: string,
  number: number,
  name: string,
  expirationDate: Date,
  cvv: number
}

async function verifyTicketAndEnrollment(ticketId: number, userId: number) {
  const ticket = await ticketRepository.getTicketById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.getEnrollmentById(ticket.enrollmentId);

  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}

async function getPaymentByTicketId(userId: number, ticketId: number) {
  await verifyTicketAndEnrollment(ticketId, userId);

  const payment = await paymentRepository.getPaymentByTicketId(ticketId);

  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function postPayment(ticketId: number, userId: number, cardData: CardType) {
  await verifyTicketAndEnrollment(ticketId, userId);

  const ticket = await ticketRepository.getTicketWithTypeById(ticketId);

  const paymentData = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentRepository.postPayment(ticketId, paymentData);

  await ticketRepository.ticketUpdatePayment(ticketId);

  return payment;
}

const paymentService = {
  getPaymentByTicketId,
  postPayment
};

export default paymentService;
