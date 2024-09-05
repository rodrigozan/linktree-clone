import { Router, Request, Response } from 'express';

const router = Router();

router.get('/links', (_req: Request, res: Response) => {
    res.json({message: 'Rota Links'})
})

export default router