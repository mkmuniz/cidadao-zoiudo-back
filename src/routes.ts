import { Router } from 'express';
import * as controller from "./controller";
const router = Router();

router
    .post('/fetch-data/:pages', controller.fetchData)
    .get('/', function (req: any, res: any) {
        res.json({ status: 'System is working, good job!' })
    });

export default router;