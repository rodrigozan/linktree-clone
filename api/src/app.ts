import express from "express"
import * as dotenv from 'dotenv'
import cors from 'cors'

import { setupSwagger } from './swagger'
import { Connection } from './database/MongoConnection'

import router from "./router"

dotenv.config()

export class App {
    public server: express.Application

    constructor() {
        this.server = express()
        this.server.get('/', (_req, res) => res.json({ message: 'root route' }))
        this.connection()
        this.middleware()
        this.routes()
        this.documentation()
    }

    private middleware() {
        this.server.use(cors())
        this.server.use(express.json())
    }

    private routes() {
        this.server.use('/api', router)
    }

    private documentation() {
        setupSwagger(this.server)
    }

    private async connection() {
        await Connection.connect()
    }

}
