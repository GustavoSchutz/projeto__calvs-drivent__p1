import { prisma } from "@/config";
import { Enrollment, Ticket, TicketStatus } from "@prisma/client";

async function getTicketTypes() {
  return prisma.ticketType.findMany();
}

async function getTicketTypeById(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId
    }
  });
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

async function postNewTicketByTicketType(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      TicketType: {
        connect: {
          id: ticketTypeId,
        },
      },
      Enrollment: {
        connect: {
          id: enrollmentId,
        }
      },
      status: TicketStatus.RESERVED,
    },
    include: {
      TicketType: true,
    },
  });
}

async function getTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    }
  });
}

async function getTicketWithTypeById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    }
  });
}

async function ticketUpdatePayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    }
  });
}

const ticketRepository = {
  getTicketTypes,
  getTicketByEnrollmentId,
  getEnrollmentByUserId,
  postNewTicketByTicketType,
  getTicketTypeById,
  getTicketById,
  getTicketWithTypeById,
  ticketUpdatePayment
};

export default ticketRepository;
