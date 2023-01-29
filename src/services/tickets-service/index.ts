import ticketRepository from "@/repositories/ticket-repository";

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.getTicketTypes();

  return ticketTypes;
}

const ticketsService = {
  getTicketTypes,
};

export default ticketsService;
