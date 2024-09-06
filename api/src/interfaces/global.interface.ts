import { Document, Types } from 'mongoose'

interface ILink extends Document {
    id: Types.ObjectId
    title: string
    url: string
    description: string
}

export { ILink }