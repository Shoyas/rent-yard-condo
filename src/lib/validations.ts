import { z } from 'zod';

export const propertyAddressSchema = z.object({
  propertyName: z.string().min(1, 'Property name is required'),
  totalUnits: z.string().min(1, 'Total units is required'),
  propertyWebsite: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  streetAddress: z.string().min(1, 'Street address is required'),
  aptSuiteUnit: z.string().optional(),
  cityTown: z.string().min(1, 'City/Town is required'),
  stateTerritory: z.string().min(1, 'State/Territory is required'),
  zipCode: z.string().min(1, 'Zip code is required')
});

// export const leasingInfoSchema = z.object({
//   manager: z.string().min(1, { message: 'Manager is required' }),
//   email: z.string().email({ message: 'Invalid email' }),
//   phone: z.string().min(1, { message: 'Phone is required' }),
//   address: z
//     .string()
//     .refine(
//       (val) =>
//         val === 'Address (same as property)' || (val && val.trim().length > 0),
//       { message: 'Address is required' }
//     )
// });

export const leasingInfoSchema = z
  .object({
    manager: z.string().min(1, 'Manager is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(1, 'Phone is required'),
    sameAsProperty: z.boolean(),
    leasingAddress: z
      .object({
        streetAddress: z.string().min(1, 'Street address is required'),
        aptSuiteUnit: z.string().optional(),
        cityTown: z.string().min(1, 'City/Town is required'),
        stateTerritory: z.string().min(1, 'State/Territory is required'),
        zipCode: z.string().min(1, 'Zip code is required')
      })
      .optional()
  })
  .refine(
    (data) => {
      if (!data.sameAsProperty) {
        return data.leasingAddress !== undefined;
      }
      return true;
    },
    {
      message: 'Leasing address is required when not same as property',
      path: ['leasingAddress']
    }
  );

export const chargesSchema = z.object({
  applicationFee: z.string().min(1, 'Application fee is required'),
  adminFee: z.string().min(1, 'Admin fee is required')
});

export const rentFrequencySchema = z.object({
  frequency: z.string().min(1, 'Frequency is required'),
  reminderDate: z.string().min(1, 'Reminder date is required'),
  dueDate: z.string().min(1, 'Due date is required')
});

export const petFeeSchema = z.object({
  type: z.string().min(1, 'Pet type is required'),
  maxWeight: z.string().min(1, 'Max weight is required'),
  monthlyRent: z.string().min(1, 'Monthly rent is required'),
  oneTimeFee: z.string().min(1, 'One time fee is required'),
  securityDeposit: z.string().min(1, 'Security deposit is required')
});

export const parkingSchema = z.object({
  type: z.string().min(1, 'Parking type is required'),
  description: z.string().optional()
});

export const educationSchema = z.object({
  name: z.string().min(1, 'Institution name is required')
});

export const stationSchema = z.object({
  name: z.string().min(1, 'Station name is required')
});

export const landmarkSchema = z.object({
  name: z.string().min(1, 'Landmark name is required')
});

export const applicationSchema = z.object({
  agreement: z.string().min(1, 'Agreement is required'),
  description: z.string().optional()
});

export const aboutSchema = z.object({
  description: z.string().min(1, 'Description is required')
});

export const amenitiesSchema = z.object({
  amenities: z.string().min(1, 'Amenities are required')
});

export const utilitiesSchema = z.object({
  provider: z.string().min(1, 'Provider is required')
});

export const pricingSchema = z.object({
  plan: z.enum(['regular', 'platinum', 'enterprise']),
  paymentMethod: z.string().min(1, 'Payment method is required')
});

export const completeFormSchema = z.object({
  propertyAddress: propertyAddressSchema.optional(),
  leasingInfo: leasingInfoSchema.optional(),
  charges: chargesSchema.optional(),
  rentFrequency: rentFrequencySchema.optional(),
  petFees: z.array(petFeeSchema).optional(),
  parking: parkingSchema.optional(),
  educationalInstitutions: z.array(educationSchema).optional(),
  stations: z.array(stationSchema).optional(),
  landmarks: z.array(landmarkSchema).optional(),
  applicationAgreement: applicationSchema.optional(),
  aboutProperty: aboutSchema.optional(),
  amenities: amenitiesSchema.optional(),
  utilities: utilitiesSchema.optional(),
  pricing: pricingSchema
});

export type PropertyAddressForm = z.infer<typeof propertyAddressSchema>;
export type LeasingInfoForm = z.infer<typeof leasingInfoSchema>;
export type ChargesForm = z.infer<typeof chargesSchema>;
export type RentFrequencyForm = z.infer<typeof rentFrequencySchema>;
export type PetFeeForm = z.infer<typeof petFeeSchema>;
export type ParkingForm = z.infer<typeof parkingSchema>;
export type EducationForm = z.infer<typeof educationSchema>;
export type StationForm = z.infer<typeof stationSchema>;
export type LandmarkForm = z.infer<typeof landmarkSchema>;
export type ApplicationForm = z.infer<typeof applicationSchema>;
export type AboutForm = z.infer<typeof aboutSchema>;
export type AmenitiesForm = z.infer<typeof amenitiesSchema>;
export type UtilitiesForm = z.infer<typeof utilitiesSchema>;
export type PricingForm = z.infer<typeof pricingSchema>;
export type CompleteForm = z.infer<typeof completeFormSchema>;
