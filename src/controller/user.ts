import { Request, Response } from "express";
import { customAlphabet } from "nanoid";
import fs from "fs";
import path from 'path';

import HttpStatusCodes from "../constant/httpStatusCodes";
import { saveDataInFile } from "../util/file-write";

const users: any[] = JSON.parse(fs.readFileSync(path.join(__dirname, '../../database/users.json'), 'utf-8') || '[]');

export const createUser = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const user_data = { id: customAlphabet('1234567890', 10)(), ...body, deleted: false };
        const check_duplicate = users.some(user => user.email.toLowerCase().trim() === user_data.email.toLowerCase().trim() && !user.deleted);
        if (check_duplicate) return res.status(HttpStatusCodes.CONFLICT).send({ message: 'User with this email already exists.' });
        users.push(user_data);
        await saveDataInFile(users);
        res.status(HttpStatusCodes.CREATED).send(user_data);
    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'An unexpected error has occurred. Please try again. If the problem persists, please contact to support.' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { params: { userId }, body } = req;
        const user_index = users.findIndex(user => user.id === userId && !user.deleted);
        if (user_index !== -1) {
            const check_duplicate = users.some(user => user.email.toLowerCase().trim() === body.email.toLowerCase().trim() && !user.deleted && user.id !== userId);

            if (check_duplicate) return res.status(HttpStatusCodes.CONFLICT).send({ message: 'User with this email already exists.' });

            users[user_index] = {
                ...users[user_index],
                ...body
            };
            await saveDataInFile(users);
            return res.status(200).send({ message: 'User updated successfully' });
        } else {
            return res.status(HttpStatusCodes.NOT_FOUND).send({ message: 'User not found' });
        };
    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'An unexpected error has occurred. Please try again. If the problem persists, please contact to support.' });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const user_data = users.filter(user => !user.deleted);
        return res.status(HttpStatusCodes.OK).send(user_data);
    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'An unexpected error has occurred. Please try again. If the problem persists, please contact to support.' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const { params: { userId } } = req;
        const user_data = users.find(user => user.id === userId && !user.deleted);
        if (!user_data) {
            return res.status(HttpStatusCodes.NOT_FOUND).send({ message: 'User not found' });
        }
        return res.status(HttpStatusCodes.OK).send(user_data);
    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'An unexpected error has occurred. Please try again. If the problem persists, please contact to support.' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { params: { userId } } = req;
        const user_index = users.findIndex(user => user.id === userId);
        if (user_index !== -1) {
            users[user_index] = {
                ...users[user_index],
                deleted: true
            };
            await saveDataInFile(users);
            return res.status(200).send({ message: 'User deleted successfully' });
        } else {
            return res.status(HttpStatusCodes.NOT_FOUND).send({ message: 'User not found' });
        };
    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'An unexpected error has occurred. Please try again. If the problem persists, please contact to support.' });
    }
};