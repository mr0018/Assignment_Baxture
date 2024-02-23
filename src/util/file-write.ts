

import { promises as fsPromises } from 'fs';
import path from 'path';

export const saveDataInFile = async (data: any) => {
    try {
        const data_in_string = JSON.stringify(data);

        await fsPromises.writeFile(path.join(__dirname, '../../database/users.json'), data_in_string);
        return 'Data saved successfully.';
    } catch (error) {
        throw error;
    }
}