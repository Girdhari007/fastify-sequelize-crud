import { z } from "zod";

// Body Schemas
export const createAddressBodySchema = z.object({
    userId: z.string().regex(/^\d+$/, "User ID must be a number"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().optional(),
    pincode: z.string().length(6, "Pincode must be 6 digits"),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

export const updateAddressBodySchema = z.object({
    userId: z.string().regex(/^\d+$/, "User ID must be a number").optional(),
    street: z.string().min(1).optional(),
    city: z.string().min(1).optional(),
    state: z.string().optional(),
    pincode: z.string().length(6).optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

export const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "Address ID must be a number"),
});

// Basic Response Schema
export const addressResponseSchema = z.object({
    id: z.number(),
    userId: z.number(),
    street: z.string(),
    city: z.string(),
    state: z.string().optional(),
    pincode: z.string().length(6),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

// Response Schemas
export const createAddressResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: addressResponseSchema,
});

export const getAllAddressesResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(addressResponseSchema),
});

export const getAddressResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: addressResponseSchema,
});

export const updateAddressResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: addressResponseSchema,
});

export const deleteAddressResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.null(),
});

export const createAddressesBatchResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(addressResponseSchema),
});

//  Type Exports
export type CreateAddressInput = z.infer<typeof createAddressBodySchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressBodySchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
export type AddressResponse = z.infer<typeof addressResponseSchema>;
export type CreateAddressResponse = z.infer<typeof createAddressResponseSchema>;
export type GetAllAddressesResponse = z.infer<typeof getAllAddressesResponseSchema>;
export type GetAddressResponse = z.infer<typeof getAddressResponseSchema>;
export type UpdateAddressResponse = z.infer<typeof updateAddressResponseSchema>;
export type DeleteAddressResponse = z.infer<typeof deleteAddressResponseSchema>;
export type CreateAddressesBatchResponse = z.infer<typeof createAddressesBatchResponseSchema>;
