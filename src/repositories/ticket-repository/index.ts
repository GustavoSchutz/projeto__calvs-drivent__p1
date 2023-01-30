import { prisma } from "@/config";
import { Enrollment, Ticket } from "@prisma/client";

async function getTicketTypes() {
  return prisma.ticketType.findMany();
}

async function getTicketByEnrollmentId(enrollmentId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId
    },
    include: {
      TicketType: true,
    },
  });
}
  
async function getEnrollmentByUserId(userId: number): Promise<Enrollment> {
  return prisma.enrollment.findFirst({
    where: {
      userId
    }
  });
} 
const ticketRepository = {
  getTicketTypes,
  getTicketByEnrollmentId,
  getEnrollmentByUserId
};
  
export default ticketRepository;
