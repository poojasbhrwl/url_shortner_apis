import { Router, Request, Response } from 'express';
import AuthService from '../controllers/auth'    // call reataurant controller
const authRoutes = Router();
const service = new AuthService();            // create object for auth controller
// route for register
authRoutes.post('/register', (req: Request, res: Response) => {
    let request: any = req.body
    // call register function
    service.registerUsers(request).then((resp: any) => {
        res.json(resp).status(resp.status)
    }).catch(e => {
        res.json(e).status(e.status)
    })
});
// route for login
authRoutes.post('/login', (req: Request, res: Response) => {
    let request: any = req.body
    // call login function
    service.login(request).then((resp: any) => {
        res.json(resp).status(resp.status)
    }).catch(e => {
        res.json(e).status(e.status)
    })
});

export default authRoutes
