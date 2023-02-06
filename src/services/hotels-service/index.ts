import { notFoundError } from "@/errors";
import { invalidTicketTypeError } from "@/errors/invalid-ticket-type-error";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function checkUserEnrollmentAndTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  
  if(!ticket || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw invalidTicketTypeError();
  }
}

async function getHotels(userId: number) {
  await checkUserEnrollmentAndTicket(userId);

  const hotels = await hotelRepository.findHotels();
  return hotels;
}

const hotelsService = {
  getHotels,
};

export default hotelsService;
