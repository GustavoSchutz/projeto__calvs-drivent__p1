import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function getPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    }
  });
}

async function postPayment(ticketId: number, params: PaymentDataType) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...params,
    }
  });
}

export type PaymentDataType = Omit<Payment, "id" | "createdAt" | "updatedAt">

const paymentRepository = {
  getPaymentByTicketId,
  postPayment,
};

export default paymentRepository;
