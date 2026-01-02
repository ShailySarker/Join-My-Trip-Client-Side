import { z } from "zod";
import { ITravelType, ITrevelInterest } from "@/types/travelPlan.interface";
import { IUserGender } from "@/types/user.interface";

// Participant schema
export const participantSchema = z.object({
  userId: z.string().optional(),
  bookingId: z.string().optional(),
  name: z
    .string({ message: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  phone: z
    .string({ message: "Phone Number must be string" })
    .regex(/^(?:01\d{9})$/, {
      message: "Phone number must be valid for Bangladesh. Format:01XXXXXXXXX",
    }),
  gender: z.nativeEnum(IUserGender, { error: "Gender is required" }),
  age: z
    .number({ message: "Age is required" })
    .int("Age must be a whole number")
    .min(5, "Age must be at least 5")
    .max(50, "Age must be less than 50"),
});

// Create travel plan schema
// Base travel plan schema (without full refinements)
export const baseTravelPlanSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title is too long"),
  description: z
    .string({ message: "Description is required" })
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description is too long"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image must be less than 5MB",
    }),
  budget: z
    .number({ message: "Budget is required" })
    .positive("Budget must be positive")
    .max(10000000, "Budget is too high"),
  city: z
    .string({ message: "Destination city is required" })
    .min(2, "City is required")
    .max(100, "City name is too long"),
  country: z
    .string({ message: "Destination country is required" })
    .min(2, "Country is required")
    .max(100, "Country name is too long"),
  departureLocation: z.string().max(200, "Location is too long").optional(),
  arrivalLocation: z.string().max(200, "Location is too long").optional(),
  included: z.array(z.string()).default([]),
  excluded: z.array(z.string()).default([]),
  startDate: z
    .string({ message: "Start date is required" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid start date format",
    }),
  endDate: z
    .string({ message: "End date is required" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid end date format",
    }),
  travelType: z.nativeEnum(ITravelType, { error: "Travel type is required" }),
  interests: z
    .array(z.nativeEnum(ITrevelInterest), {
      message: "Interests are required",
    })
    .min(1, "Select at least one interest")
    .max(5, "Maximum 5 interests allowed"),
  maxGuest: z
    .number({ message: "Max guest number is required" })
    .int("Must be a whole number")
    .min(5, "At least 5 guest required")
    .max(50, "Maximum 50 guests allowed"),
  minAge: z
    .number({ message: "Minimum age is required" })
    .int("Must be a whole number")
    .min(5, "Minimum age must be at least 5")
    .max(50, "Minimum age must be less than 50"),
});

// Create travel plan schema logic
export const createTravelPlanSchema = baseTravelPlanSchema
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end >= start;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + 0); // 7 days from today
      minDate.setHours(0, 0, 0, 0);
      return start >= minDate;
    },
    {
      message: "Start date must be at least 7 days from today",
      path: ["startDate"],
    }
  );

// Update travel plan schema (all fields optional)
export const updateTravelPlanSchema = z
  .object({
    title: z
      .string({ message: "Title is required" })
      .min(5, "Title must be at least 5 characters")
      .max(200, "Title is too long")
      .optional(),
    description: z
      .string({ message: "Description is required" })
      .min(20, "Description must be at least 20 characters")
      .max(2000, "Description is too long")
      .optional(),
    // image: z.instanceof(File, { message: "Image is required" }),
    image: z
      .instanceof(File, { message: "Image is required" })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "Image must be less than 5MB",
      })
      .optional(),

    budget: z
      .number({ message: "Budget is required" })
      .positive("Budget must be positive")
      .max(10000000, "Budget is too high")
      .optional(),
    // destination: z.object({
    city: z
      .string({ message: "Destination city is required" })
      .min(2, "City is required")
      .max(100, "City name is too long")
      .optional(),
    country: z
      .string({ message: "Destination country is required" })
      .min(2, "Country is required")
      .max(100, "Country name is too long")
      .optional(),
    // }),
    departureLocation: z.string().max(200, "Location is too long").optional(),
    arrivalLocation: z.string().max(200, "Location is too long").optional(),
    // Arrays are required with default empty values
    included: z.array(z.string()).default([]).optional(),
    excluded: z.array(z.string()).default([]).optional(),
    startDate: z
      .string({ message: "Start date is required" })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid start date format",
      }),
    endDate: z
      .string({ message: "End date is required" })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid end date format",
      }),
    travelType: z.nativeEnum(ITravelType, { error: "Travel type is required" }),
    interests: z
      .array(z.nativeEnum(ITrevelInterest), {
        message: "Interests are required",
      })
      .min(1, "Select at least one interest")
      .max(5, "Maximum 5 interests allowed"),
    maxGuest: z
      .number({ message: "Max guest number is required" })
      .int("Must be a whole number")
      .min(5, "At least 5 guest required")
      .max(50, "Maximum 50 guests allowed"),
    minAge: z
      .number({ message: "Minimum age is required" })
      .int("Must be a whole number")
      .min(5, "Minimum age must be at least 5")
      .max(50, "Minimum age must be less than 50"),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end >= start;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return start >= now;
    },
    {
      message: "Start date must be in the future",
      path: ["startDate"],
    }
  );

// Add participant schema
export const addParticipantSchema = participantSchema;

// Type exports
export type CreateTravelPlanInput = z.infer<typeof createTravelPlanSchema>;
export type UpdateTravelPlanInput = z.infer<typeof updateTravelPlanSchema>;
export type ParticipantInput = z.infer<typeof participantSchema>;
