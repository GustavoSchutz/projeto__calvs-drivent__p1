import { ApplicationError } from "@/protocols";

export function invalidTicketTypeError(): ApplicationError {
  return {
    name: "InvalidTicketTypeError",
    message: "Ticket é remoto ou não inclui hotel",
  };
}
