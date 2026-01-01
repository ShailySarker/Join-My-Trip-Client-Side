import { z } from "zod";

// Create review schema
export const createReviewSchema = z.object({
  reviewedUserId: z.string().min(1, "User ID is required"),
  travelPlanId: z.string().min(1, "Travel plan ID is required"),
  rating: z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(1000, "Comment is too long"),
});

// Update review schema (all fields optional except rating and comment)
export const updateReviewSchema = z.object({
  rating: z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .optional(),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(1000, "Comment is too long")
    .optional(),
}).refine((data) => data.rating !== undefined || data.comment !== undefined, {
  message: "At least one field (rating or comment) must be provided",
});

// Type exports
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
