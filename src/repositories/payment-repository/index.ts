import { prisma } from "@/config";

async function getPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    }
  });
}

const paymentRepository = {
  getPaymentByTicketId,
};

export default paymentRepository;
