import { Request, Response } from 'express';
import { Services } from './service';

export async function fetchData(req: Request, res: Response) {
    try {
        const { UF, city, datePeriod } = req.body;
        const data = await Services.fetchData(UF, city, datePeriod).then(data => res.json(data));

        return data;
    } catch (err: any) {
        return err;
    };
};