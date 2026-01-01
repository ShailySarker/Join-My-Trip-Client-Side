import { z } from "zod";
import { participantSchema } from "./travelPlan.validation";

// Create booking schema
export const createBookingSchema = z
  .object({
    travelId: z.string().min(1, "Travel plan ID is required"),
    amount: z
      .number()
      .positive("Amount must be positive")
      .max(10000000, "Amount is too high"),
    totalPeople: z
      .number()
      .int("Must be a whole number")
      .min(1, "At least 1 person required")
      .max(100, "Maximum 100 people allowed"),
    participants: z
      .array(participantSchema)
      .min(1, "At least one participant is required")
      .max(100, "Maximum 100 participants allowed"),
  })
  .refine((data) => data.totalPeople === data.participants.length, {
    message: "Total people must match number of participants",
    path: ["totalPeople"],
  });

// Add participants to booking schema
export const addParticipantsToBookingSchema = z.object({
  participants: z
    .array(participantSchema)
    .min(1, "At least one participant is required")
    .max(10, "Maximum 10 participants can be added at once"),
});

// Type exports
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type AddParticipantsInput = z.infer<
  typeof addParticipantsToBookingSchema
>;
