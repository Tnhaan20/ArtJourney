import { z } from "zod";

// Custom validation function for year format
const yearValidator = z
  .string()
  .min(1, "Year is required")
  .regex(
    /^\d+\s+(CE|BCE)$/,
    "Year must be in format: number + space + CE/BCE (e.g., '100 CE', '50 BCE')"
  )
  .refine((value) => {
    const match = value.match(/^(\d+)\s+(CE|BCE)$/);
    if (!match) return false;
    const yearNumber = parseInt(match[1]);
    return yearNumber > 0 && yearNumber <= 9999;
  }, "Year number must be between 1 and 9999");

export const useHistoricalSchema = z
  .object({
    HistoricalPeriodName: z
      .string()
      .min(2, "Historical period name must be at least 2 characters long")
      .max(100, "Historical period name must be less than 100 characters")
      .trim(),

    Description: z
      .string()
      .max(500, "Description cannot exceed 500 characters")
      .optional()
      .or(z.literal("")),

    StartYear: yearValidator,

    EndYear: yearValidator,

    CreateRequestRegionIds: z
      .array(z.number())
      .min(1, "At least one region must be selected")
      
  })
  .refine(
    (data) => {
      // Additional validation to ensure logical year progression
      const startMatch = data.StartYear.match(/^(\d+)\s+(CE|BCE)$/);
      const endMatch = data.EndYear.match(/^(\d+)\s+(CE|BCE)$/);

      if (!startMatch || !endMatch) return true; // Let individual field validation handle this

      const startYear = parseInt(startMatch[1]);
      const startEra = startMatch[2];
      const endYear = parseInt(endMatch[1]);
      const endEra = endMatch[2];

      // Convert to comparable numbers (BCE years are negative)
      const startYearComparable = startEra === "BCE" ? -startYear : startYear;
      const endYearComparable = endEra === "BCE" ? -endYear : endYear;

      return startYearComparable < endYearComparable;
    },
    {
      message: "Start year must be earlier than end year",
      path: ["EndYear"], // Show error on EndYear field
    }
  );
