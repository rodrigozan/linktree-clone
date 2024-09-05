import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv'
import https from 'https'

const agent = new https.Agent({
    rejectUnauthorized: false
});

dotenv.config()

import { UserService } from "../services/UserService";

const service = UserService;

class UserController {
    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const create_user = await service.create(data);
            
            const id = create_user?.id
            console.log('id',id)

            const user = await service.getById(Number(id))
            .then(result => {return result})

            await axios.post(`${process.env.AUTH_URL}/CreateUser`, {
                id: user?.id,
                email: user?.email,
                username: user?.username,
                password: user?.password
            }, { httpsAgent: agent })
            .then(result => console.log({result: 'Result of Auth MS', message: result.data.message, data: result.data.user}))
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    console.error('Axios error:', error.response?.data || error.message);
                    return res.status(500).json({ 
                        error: error.response?.data || error.message 
                    });
                } else {
                    console.error('Other error:', error.message);
                    return res.status(500).json({ error: error.message })
                }
            })
            
            console.log('Result of User MS',user)
            return res.status(201).json({ result: 'Result of User MS', message: 'User created succefull', created: user });
        } catch (error) {
            console.error('error', error)
            return res.status(500).json({ error: error.message  });
        }
    }

    async get(_req: Request, res: Response) {
        try {
            const users = await service.get();
            return res.status(200).json({ message: 'Users find succefull', get: users });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await service.getById(Number(id));
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({ message: 'User find succefull', get: user });
        } catch (error) {
            console.error('error', error)
            return res.status(500).json({ error: error.message });
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const { field } = req.params

            if (field === undefined || field === '') {
                return res.status(404).json({ error: 'Field not found' });
            }

            const user = await service.getOne(field);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({ message: 'User find succefull', get: user });
        } catch (error) {
            console.error('error', error)
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const user = await service.update(Number(id), data);
            if (user) {
                await axios.put(`${process.env.AUTH_URL}/UpdateeUser`, {
                    ...user,
                    id: Number(id)
                }, { httpsAgent: agent });
            }
            return res.status(200).json({ message: 'User updated succefull', updated: user });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await service.delete(Number(id));
            console.log({ message: 'User deleted succefull'})
            return res.sendStatus(204)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new UserController();
