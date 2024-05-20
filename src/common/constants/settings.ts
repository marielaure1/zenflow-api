import * as dotenv from 'dotenv';
dotenv.config();

const settings = {
    ...process.env
}

export default settings;
