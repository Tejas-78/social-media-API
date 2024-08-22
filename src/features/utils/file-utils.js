import { v4 as uniqueId } from 'uuid';
import fs from 'fs';
import path from 'path';
import { ApplicationError } from '../../../error/application.error.js';

export const readJSONFile = (filePath) => {
    try {
        const resolvedPath = path.resolve(filePath);
        let data = fs.readFileSync(resolvedPath, { encoding: 'utf-8' });
        if (data.trim() === '') {
            return []; 
        }
        return JSON.parse(data);
    } catch (err) {
        console.error('Error in json fie reading or parsing JSON file:', err);
        return [];  
    }
};

export const writeJSONFile = (filePath, data) => {
    try {
        const resolvedPath = path.resolve(filePath);

        // if (!Array.isArray(data)) {
        //     throw new ApplicationError("Data to write must be an array");
        // }

        fs.writeFileSync(resolvedPath, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
    } catch (err) {
        console.error('Error writing JSON file:', err);
    }
};


export const generateUniqueId = () => {
    return uniqueId();
};