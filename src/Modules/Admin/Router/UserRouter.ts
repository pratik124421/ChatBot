import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../Controller/UserController';

export class UserRouter {
    private static router: Router

    public static getInstance(): Router {
        if (UserRouter.router == null) {
            let Userroute = new UserRouter()
            Userroute.Routerinit();
        }
        return UserRouter.router;
    }

    private constructor() {
        UserRouter.router = Router();
    }

    public getUser(req: Request, res: Response) {
        let ctrl = UserController.getInstance();
        ctrl.getUser(req, res);
    }
  
    Routerinit() {
        UserRouter.router.post('/getuser', this.getUser);
        
    }

}
