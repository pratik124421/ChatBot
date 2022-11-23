import { Router, NextFunction, Request, Response } from 'express';
import { BaseRouter } from '../../../CommonFile/BaseRouter';
import { AdminController } from '../Controller/AdminController';
import { UserRouter } from './UserRouter';

export class AdminRouter extends BaseRouter {

    private controller:AdminController;
    
    constructor() {
        super();
    }

    Routerinit(router: Router) {
        router.get('/action', this.action);
        router.use('/user', UserRouter.getInstance())
        
       
        // throw new Error("Method not implemented.");
    }

    public action(req: Request, res: Response) {
        AdminController.getInstance().action(req, res);
    }
}