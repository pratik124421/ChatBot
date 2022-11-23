import { Request, Response } from 'express';
import { UserDao } from '../Dao/UserDao';

export class UserController{

    private static instance: UserController;

    private constructor() {
    }

    public static getInstance = () => {
        if (UserController.instance == null) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }



    public async getUser(req: Request, res: Response): Promise<any> {
        let ts = UserDao.getInstance();
        ts.getUser(req.body).then(tenant => {
            res.send(tenant);
        });
    }
}
