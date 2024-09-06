import { Schema, model } from 'mongoose';

import { ILink } from '../interfaces/global.interface'

const linkSchema = new Schema<ILink>({
    url: { type: String, required: true },
});


export const LinkModel = model('links', linkSchema);
