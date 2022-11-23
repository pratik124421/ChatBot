import { Request, Response } from 'express';
import { AdminDao } from '../Dao/AdminDao';


export class AdminController {
    private static instance: AdminController;
    private AdminDao : AdminDao

    private constructor(){
        
        this.AdminDao = new AdminDao();
    }
    
    public static getInstance = () => {
        if (AdminController.instance == null) {
            AdminController.instance = new AdminController();
        }
        return AdminController.instance;
    }

    

    public async action(req: Request, res: Response) {

        return await this.AdminDao.action(req, res).then(tb => {
            res.send(tb);
        });
    }

}
