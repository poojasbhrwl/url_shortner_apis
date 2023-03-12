import authRoutes from './auth.route';
import urlsRoutes from './urls.route';
import { Router, Request, Response } from 'express';

const routes = Router();
// use auth routes with url /auth
routes.get('/healthCheck', async (req: Request, res: Response, _next) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = "Something went wrong";
        res.status(503).send();
    }
});

routes.use('/auth',  authRoutes);
// use urls routes with url /url
routes.use('/',  urlsRoutes);
  
export default routes