import { Request, Response } from 'express';
import { Services } from './service';

export async function fetchData(req: Request, res: Response) {
    try {
        const { pages, city, state } = req.body;
        const data = await Services.fetchData(pages, city, state).then(data => res.json(data));

        return data;
    } catch (err) {
        return err;
    };
};