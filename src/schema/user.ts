import { boolean, string, email, hobbies, number, id } from "./common";


export const createUserSchema: any = {
    type: 'object',
    required: ['name', 'email', 'hobbies', 'age'],
    properties: {
        name: string,
        email,
        hobbies,
        age: number,
    },
};

export const updateUserSchemaParams: any = {
    type: 'object',
    required: ['userId'],
    properties: {
        userId: id
    }
};

export const getUserSchemaParams: any = {
    type: 'object',
    required: ['userId'],
    properties: {
        userId: id
    }
};

export const deleteUserSchemaParams: any = {
    type: 'object',
    required: ['userId'],
    properties: {
        userId: id
    }
};

export const updateUserSchemaBody: any = {
    type: 'object',
    required: [],
    properties: {
        name: string,
        email,
        hobbies,
        age: number,
    },
};