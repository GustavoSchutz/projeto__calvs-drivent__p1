import { prisma } from "@/config";
import { TicketType } from "@prisma/client";

async function getTicketTypes() {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  getTicketTypes,
};
  
export default ticketRepository;
