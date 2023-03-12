import { Router, Request, Response } from 'express';
import UrlService from '../controllers/urls';
import { authenticateTokens } from '../middleware/authenticate.middleware'
const urlRoutes = Router();
const service = new UrlService();

// route for get url
urlRoutes.get('/:code', authenticateTokens.verifyAdminRole, (req: Request, res: Response) => {
    let request: any = req.params  // create object for request
    // call get url controller
    service.getUrl(request).then(resp => {
        if(resp.status == 200) {
            return res.redirect(resp.data.originalUrl)
        }
        res.json(resp).status(resp.status)
    }).catch(e => {
        res.json(e).status(e.status)
    })
});

// route for create new url
urlRoutes.post('/', authenticateTokens.verifyAdminRole, (req: Request, res: Response) => {
    let request: any = {originalUrl: req.body.originalUrl, baseUrl: req.protocol + '://' + req.get('host')}
    // call create url controller
    service.createUrl(request).then(resp => {
        res.json(resp).status(resp.status)
    }).catch(e => {
        res.json(e).status(e.status)
    })
});
export default urlRoutes
