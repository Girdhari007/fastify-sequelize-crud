import { z } from "zod";


export const createUserBodySchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
});

export const updateUserBodySchema = z.object({
    first_name: z.string().min(1).optional(),
    last_name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

export const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "User ID must be a number"),
});

//basic user response schema
export const userResponseSchema = z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

//post user response schema
export const createUserResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: userResponseSchema,
});

// get all users response schema
export const getAllUsersResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(userResponseSchema),
});

//get user by ID response schema
export const getUserResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: userResponseSchema,
});

//update user response schema
export const updateUserResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: userResponseSchema,
});

//delete user response schema
export const deleteUserResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: userResponseSchema,
});

//post users/batch response schema
export const createUsersResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(userResponseSchema),
});

//basic user with address response schema
export const userAddressResponseSchema = z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
    addresses: z.array(z.object({
        id: z.number(),
        userId: z.number(),
        street: z.string(),
        city: z.string(),
        state: z.string().optional(),
        pincode: z.string().length(6),
        createdAt: z.string().datetime().optional(),
        updatedAt: z.string().datetime().optional(),
    }))
});

//get all user with address response schema
export const getUsersWithAddressResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.array(userAddressResponseSchema),
});

//get user with address response schema
export const getUserWithAddressResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: userAddressResponseSchema,
});

export type CreateUserInput = z.infer<typeof createUserBodySchema>;
export type UpdateUserInput = z.infer<typeof updateUserBodySchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;

export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
export type CreateUsersResponse = z.infer<typeof createUsersResponseSchema>;
export type GetUserResponse = z.infer<typeof getUserResponseSchema>;
export type GetAllUsersResponse = z.infer<typeof getAllUsersResponseSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>;
export type DeleteUserResponse = z.infer<typeof deleteUserResponseSchema>;
export type GetUsersWithAddressResponse = z.infer<typeof getUsersWithAddressResponseSchema>;
export type GetUserWithAddressResponse = z.infer<typeof getUserWithAddressResponseSchema>;
